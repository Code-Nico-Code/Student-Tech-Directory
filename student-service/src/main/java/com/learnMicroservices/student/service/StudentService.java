package com.learnMicroservices.student.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.learnMicroservices.student.entity.Student;
import com.learnMicroservices.student.exception.ResourceNotFoundException;
import com.learnMicroservices.student.repository.StudentRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StudentService {

    private final StudentRepository studentRepository;

    public List<Student> getAllStudent() {
        return studentRepository.findAll();
    }

    public Student getStudentById(String id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));
    }

    public Student createStudent(Student student) {
        return studentRepository.save(student);
    }

    public Student updateStudent(String id, Student studentDetails) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));

        student.setName(studentDetails.getName());
        return studentRepository.save(student);
    }

    public void deleteStudent(String id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));
        studentRepository.delete(student);
    }
    
    public Student getStudentByName(String name) {
        return studentRepository.findByNameIgnoreCase(name)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with name: " + name));
    }
}
