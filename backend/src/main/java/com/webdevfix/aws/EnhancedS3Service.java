
package com.webdevfix.aws;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.internal.Mimetypes;
import com.amazonaws.services.s3.model.*;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;


import com.nimbusds.common.contenttype.ContentType;
import jakarta.activation.MimeType;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.MimeTypeUtils;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
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

        return  UUID.randomUUID().toString();
    }


    public void deleteObject(String objectKey) {
        s3Client.deleteObject(defaultBucketName, objectKey);
    }
    public void deletePenObjects(String baseObjectKey) {
        List<String> filenames = Arrays.asList("index.html", "styles.css", "script.js");
        for (String filename : filenames) {
            String objectKey = baseObjectKey + "/" + filename;
            deleteObject(objectKey);
        }
    }


    public <T> T getEnhancedObject(String objectKey, Class<T> objectClass) throws IOException {
        S3Object s3Object = s3Client.getObject(defaultBucketName, objectKey);
        System.out.println("Fetching object with key: " + objectKey);
        System.out.println(s3Object.getObjectMetadata().getContentType());
        InputStream inputStream = s3Object.getObjectContent();
        return objectMapper.readValue(inputStream, objectClass);
    }

    public <T> List<T> getBatchObjects(List<S3Object> objects, Class<T> objectClass) {

        List<CompletableFuture<T>> futures = objects.stream()

                .map(s3Object -> CompletableFuture.supplyAsync(() -> {
                    try {

                        return getEnhancedObject(s3Object.getKey(), objectClass);

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


    public String uploadWebFiles(PenRequestForm webFiles) {
        String folderKey = generateKeyForObject(webFiles);

        if (webFiles.html() != null && webFiles.css() != null) {
            putObjectToS3(webFiles.html(), folderKey + "/index.html", "text/html").join();
            putObjectToS3(webFiles.css(), folderKey + "/styles.css", "text/css").join();
            putObjectToS3(webFiles.js(), folderKey + "/script.js", "application/javascript").join();

            System.out.println("html,css,js" + webFiles.html() + webFiles.css() + webFiles.js());
        }

        return folderKey;
    }


    private CompletableFuture<Void> putObjectToS3(String content, String key, String contentType) {
        return CompletableFuture.runAsync(() -> {
            try {
                byte[] contentBytes = objectMapper.writeValueAsBytes(content);
                InputStream inputStream = new ByteArrayInputStream(contentBytes);
                ObjectMetadata metadata = new ObjectMetadata();
                metadata.setContentType(contentType);
                metadata.setContentLength(contentBytes.length);
                PutObjectRequest putObjectRequest = new PutObjectRequest(defaultBucketName, key, inputStream, metadata);
                s3Client.putObject(putObjectRequest);
            } catch (Exception e) {
                throw new RuntimeException("Error uploading content to S3", e);
            }
        });
    }


}
