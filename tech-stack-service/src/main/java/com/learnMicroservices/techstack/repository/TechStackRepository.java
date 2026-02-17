package com.learnMicroservices.techstack.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.learnMicroservices.techstack.entity.TechStack;

@Repository
public interface TechStackRepository extends MongoRepository<TechStack, String>{

	boolean existsByName(String name);
	Optional<TechStack> findByName(String name);
}
