package com.learnMicroservices.techstack.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "tech_stacks")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TechStack {
	
	@Id
	private String id;  // Changed from Long to String (MongoDB ObjectId)
	
	@Field(name = "name")
	@Indexed(unique = true)
	private String name;
}
