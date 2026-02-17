package com.learnMicroservices.student.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "students")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Student {
	
	@Id
	private String id;  // Changed from Long to String (MongoDB ObjectId)
	
	@Field(name = "name")
	private String name;

}
