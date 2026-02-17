package com.learnMicroservice.enrollment.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.learnMicroservice.enrollment.entity.Enrollment;

@Repository
public interface EnrollmentRepository extends MongoRepository<Enrollment, String> {
    
    List<Enrollment> findByStudentId(String studentId);
}
