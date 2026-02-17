package com.learnMicroservices.techstack;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class TechStackServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(TechStackServiceApplication.class, args);
	}

}
