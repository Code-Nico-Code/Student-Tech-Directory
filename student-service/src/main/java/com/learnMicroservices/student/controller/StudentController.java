package com.learnMicroservices.student.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.learnMicroservices.student.entity.Student;
import com.learnMicroservices.student.service.StudentService;
import com.learnMicroservices.student.util.RoleChecker;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/students")
@RequiredArgsConstructor
@Tag(name = "Student Management", description = "APIs for managing student profiles")
public class StudentController {

    private final StudentService studentService;
    private final RoleChecker roleChecker;

    @GetMapping("/getAllStudents")
    @Operation(summary = "Get all students")
    public ResponseEntity<List<Student>> getAllStudent() {
        return ResponseEntity.ok(studentService.getAllStudent());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get student by ID")
    public ResponseEntity<Student> getStudentById(@PathVariable String id) {
        Student student = studentService.getStudentById(id);
        return ResponseEntity.ok(student);
    }

    @PostMapping("/createStudent")
    @Operation(summary = "Create a new student - ADMIN only")
    public ResponseEntity<Student> createStudent(
            @RequestBody Student student,
            @RequestHeader(value = "X-User-Role", required = false) String role) {

        roleChecker.requireAdmin(role);
        Student createdStudent = studentService.createStudent(student);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdStudent);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update student - ADMIN only")
    public ResponseEntity<Student> updateStudent(
            @PathVariable String id,
            @RequestBody Student student,
            @RequestHeader(value = "X-User-Role", required = false) String role) {

        roleChecker.requireAdmin(role);
        Student updatedStudent = studentService.updateStudent(id, student);
        return ResponseEntity.ok(updatedStudent);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete student - ADMIN only")
    public ResponseEntity<String> deleteStudent(
            @PathVariable String id,
            @RequestHeader(value = "X-User-Role", required = false) String role) {

        roleChecker.requireAdmin(role);
        studentService.deleteStudent(id);
        return ResponseEntity.ok("Student deleted successfully");
    }

    @GetMapping("/name/{name}")
    @Operation(summary = "Get student by name")
    public ResponseEntity<Student> getStudentByName(@PathVariable String name) {
        Student student = studentService.getStudentByName(name);
        return ResponseEntity.ok(student);
    }
}
