package com.learnMicroservice.gateway.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RouteConfig {

    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
                // Student Service Routes
                .route("student-service", r -> r
                        .path("/api/students/**")
                        .uri("lb://STUDENT-SERVICE"))
                
                // Tech Stack Service Routes
                .route("techstack-service", r -> r
                        .path("/api/techstacks/**")
                        .uri("lb://TECH-STACK-SERVICE"))
                
                // Enrollment Service Routes
                .route("enrollment-service", r -> r
                        .path("/api/enrollments/**")
                        .uri("lb://ENROLLMENT-SERVICE"))
                
                .build();
    }
}
