//package com.webdevfix.aws;
//import com.amazonaws.AmazonServiceException;
//import com.amazonaws.SdkClientException;
//import com.amazonaws.auth.AWSStaticCredentialsProvider;
//import com.amazonaws.auth.BasicAWSCredentials;
//import com.amazonaws.auth.profile.ProfileCredentialsProvider;
//import com.amazonaws.services.s3.AmazonS3;
//import com.amazonaws.services.s3.AmazonS3ClientBuilder;
//import com.amazonaws.services.s3.model.*;
//import com.amazonaws.util.IOUtils;
//import com.fasterxml.jackson.core.JsonProcessingException;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.webdevfix.repository.PenRepository;
//import com.webdevfix.repository.UserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Service;
//import java.io.ByteArrayInputStream;
//import java.io.IOException;
//import java.io.InputStream;
//import java.net.URL;
//import java.util.UUID;
//
//@Service
//public class AwsPenComponentServiceImpl implements AwsPenComponentService{
//    private final AmazonS3 s3Client;
//
//
//    private final UserRepository userRepository;
//
//    @Value("${aws.bucket.name}")
//    private String bucketName;
//    @Value("${aws.region}")
//    private String region;
//    @Value("${aws.accessKey}")
//    private String accessKey;
//
//    @Value("${aws.secretKey}")
//    private String secretKey;
//
//
//    private final ObjectMapper objectMapper;
//    @Autowired
//    public AwsPenComponentServiceImpl(AmazonS3 s3Client, UserRepository userRepository, ObjectMapper objectMapper) {
//        this.s3Client = s3Client;
//
//        this.userRepository = userRepository;
//        this.objectMapper = objectMapper;
//    }
//
//
//    @Override
//    public void delete(String objectKey) {
//        System.out.println("objectKey1=" + objectKey);
//        try {
//            s3Client.deleteObject(new DeleteObjectRequest(bucketName, objectKey));
//        } catch (AmazonServiceException e) {
//            e.printStackTrace();
//        }
//    }
//
//    @Override
//    public String upload(PenRequestForm penRequestForm) {
//        userRepository.findById(penRequestForm.userId());
//        return saveToS3(penRequestForm, penRequestForm.userId().toString());
//    }
//
//    private String saveToS3(PenRequestForm penRequestForm, String userId) {
//        String content;
//        try {
//            content = objectMapper.writeValueAsString(penRequestForm);
//        } catch (JsonProcessingException e) {
//            e.printStackTrace();
//            throw new RuntimeException("Error processing PenRequestForm to JSON");
//        }
//        String key = userId + "/" + UUID.randomUUID() + "/penRequestForm";
//        byte[] contentBytes = content.getBytes();
//        InputStream inputStream = new ByteArrayInputStream(contentBytes);
//        ObjectMetadata metadata = new ObjectMetadata();
//
//        metadata.setContentLength(contentBytes.length);
//        s3Client.putObject(bucketName, key, inputStream, metadata);
//        System.out.println("key = " + key);
//        return key;
//    }
//
//    public String fetchPenData(String objectKey) throws IOException {
//        S3Object s3object = s3Client.getObject(bucketName, objectKey);
//        S3ObjectInputStream inputStream = s3object.getObjectContent();
//        return IOUtils.toString(inputStream);
//    }
//
//
//
//}
