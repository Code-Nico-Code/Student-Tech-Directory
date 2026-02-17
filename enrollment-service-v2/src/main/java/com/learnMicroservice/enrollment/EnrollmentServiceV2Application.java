package com.learnMicroservice.enrollment;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class EnrollmentServiceV2Application {

    public static void main(String[] args) {
        SpringApplication.run(EnrollmentServiceV2Application.class, args);
    }
}