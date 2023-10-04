
package com.webdevfix.aws;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nimbusds.common.contenttype.ContentType;
import com.nimbusds.openid.connect.sdk.assurance.evidences.attachment.Content;
import com.webdevfix.model.MimeTypes;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.MimeType;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

@Service
public class EnhancedS3Service {

    private final AmazonS3 s3Client;
    private final ObjectMapper objectMapper;

    @Value("${aws.bucket.name}")
    private String defaultBucketName;

    @Autowired
    public EnhancedS3Service(AmazonS3 s3Client, ObjectMapper objectMapper) {
        this.s3Client = s3Client;
        this.objectMapper = objectMapper;
    }


    private <T> String generateKeyForObject(T object) {

        return object.getClass().getSimpleName() + "/" + UUID.randomUUID();
    }

    @SneakyThrows
    public void deleteObject(String objectKey) {
        s3Client.deleteObject(defaultBucketName, objectKey);
    }

    public <T> T getEnhancedObject(String objectKey, Class<T> objectClass) throws IOException {
        S3Object s3Object = s3Client.getObject(defaultBucketName, objectKey);
        InputStream inputStream = s3Object.getObjectContent();
        return objectMapper.readValue(inputStream, objectClass);
    }

    public <T> List<T> getBatchObjects(List<S3Object> objects, Class<T> objectClass) {

        List<CompletableFuture<T>> futures = objects.stream()

                .map(s3Object -> CompletableFuture.supplyAsync(() -> {
                    try {

                        return getEnhancedObject(s3Object.toString(), objectClass);
                    } catch (IOException e) {
                        throw new RuntimeException("Error reading object from S3", e);
                    }
                }))
                .toList();

        return futures.stream()
                .map(CompletableFuture::join)
                .collect(Collectors.toList());
    }


    public <T> CompletableFuture<List<T>> getBatchEnhancedObjects(List<S3Object> objects, Class<T> objectClass) {
        List<CompletableFuture<T>> futures = objects.stream()
                .map(obj -> CompletableFuture.supplyAsync(() -> {
                    try {
                        return getEnhancedObject(obj.toString(), objectClass);
                    } catch (IOException e) {
                        throw new RuntimeException("Error reading object from S3", e);
                    }
                }))
                .toList();

        return CompletableFuture.allOf(futures.toArray(new CompletableFuture[0]))
                .thenApply(voidVal -> futures.stream().map(CompletableFuture::join).collect(Collectors.toList()));
    }


    public <T> String uploadObject(T object) {

        String content;
        try {
            content = objectMapper.writeValueAsString(object);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error processing object to JSON", e);
        }

        String key = generateKeyForObject(object);
        putObjectToS3(content, key).join();
        return key;
    }

    private  <T> CompletableFuture<Void> putObjectToS3(T content, String key) {
        return CompletableFuture.runAsync(() -> {
            try {
                byte[] contentBytes = objectMapper.writeValueAsBytes(content);
                InputStream inputStream = new ByteArrayInputStream(contentBytes);
                ObjectMetadata metadata = new ObjectMetadata();
                metadata.setContentType(ContentType.APPLICATION_JSON.getType());
                metadata.setContentLength(contentBytes.length);
                System.out.println("Content type: " + metadata.getContentType());
                PutObjectRequest putObjectRequest = new PutObjectRequest(defaultBucketName, key, inputStream, metadata);
                s3Client.putObject(putObjectRequest);



            } catch (JsonProcessingException e) {
                throw new RuntimeException("Error converting content to bytes", e);
            }
        });
    }


}
