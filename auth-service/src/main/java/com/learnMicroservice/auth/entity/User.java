package com.learnMicroservice.auth.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection="users")
public class User {
	
	@Id
	private String id;
	
	@Indexed(unique = true)
	private String username;
	
	private String password;
	
	private String role;

}
