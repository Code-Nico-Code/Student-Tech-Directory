package com.learnMicroservice.enrollment.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "enrollments")
@CompoundIndex(name = "student_techstack_idx", def = "{'studentId': 1, 'techStackId': 1}", unique = true)
public class Enrollment {
    
    @Id
    private String id;
    private String studentId;
    private String techStackId;
}
