package com.learnMicroservice.enrollment.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.learnMicroservice.enrollment.dto.StudentProfileDTO;
import com.learnMicroservice.enrollment.entity.Enrollment;
import com.learnMicroservice.enrollment.service.EnrollmentService;
import com.learnMicroservice.enrollment.util.RoleChecker;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/enrollments")
@RequiredArgsConstructor
public class EnrollmentController {

    private final EnrollmentService enrollmentService;
    private final RoleChecker roleChecker;

    // USER can enroll themselves
    @PostMapping("/enroll")
    @ResponseStatus(HttpStatus.CREATED)
    public List<Enrollment> enroll(
            @RequestParam String studentName,
            @RequestParam List<String> techStackNames,
            @RequestHeader(value = "X-User-Role", required = false) String role) {

        roleChecker.requireUser(role); // Only USER can enroll
        return enrollmentService.enroll(studentName, techStackNames);
    }

    // ADMIN sees all profiles, USER sees all (read-only)
    @GetMapping("/profiles")
    public List<StudentProfileDTO> getAllProfiles() {
        return enrollmentService.getAllStudentProfiles();
    }

    // Only ADMIN can delete enrollments
    @DeleteMapping("/student/{studentId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteEnrollmentsByStudentId(
            @PathVariable String studentId,
            @RequestHeader(value = "X-User-Role", required = false) String role) {

        roleChecker.requireAdmin(role);
        enrollmentService.deleteEnrollmentsByStudentId(studentId);
    }
}
