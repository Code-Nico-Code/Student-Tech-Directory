package com.learnMicroservices.student.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.learnMicroservices.student.entity.Student;

@Repository
public interface StudentRepository extends MongoRepository<Student, String> {
    
    Optional<Student> findByNameIgnoreCase(String name);
}
