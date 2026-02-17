package com.learnMicroservice.auth.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.learnMicroservice.auth.entity.User;

public interface UserRepository extends MongoRepository<User, String> {

	Optional<User> findByUsername(String username);
	boolean existsByUsername(String username);
}
