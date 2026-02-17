package com.learnMicroservice.enrollment.service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.learnMicroservice.enrollment.dto.StudentDTO;
import com.learnMicroservice.enrollment.dto.StudentProfileDTO;
import com.learnMicroservice.enrollment.dto.TechStackDTO;
import com.learnMicroservice.enrollment.entity.Enrollment;
import com.learnMicroservice.enrollment.exception.ResourceNotFoundException;
import com.learnMicroservice.enrollment.repository.EnrollmentRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EnrollmentService {

    private static final String STUDENT_SERVICE = "http://localhost:8081/api/students";
    private static final String TECHSTACK_SERVICE = "http://localhost:8082/api/techstacks";

    private final EnrollmentRepository repository;
    private final WebClient.Builder webClientBuilder;

    public List<Enrollment> enroll(String studentName, List<String> techStackNames) {
        StudentDTO student = getStudentByName(studentName)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found: " + studentName));

        return techStackNames.stream()
                .map(name -> getTechStackByName(name)
                        .orElseThrow(() -> new ResourceNotFoundException("Tech stack not found: " + name)))
                .filter(tech -> !isAlreadyEnrolled(student.id(), tech.id()))
                .map(tech -> repository.save(new Enrollment(null, student.id(), tech.id())))
                .toList();
    }

    public List<StudentProfileDTO> getAllStudentProfiles() {
        return getAllStudents().stream()
                .map(student -> buildProfile(student.id()))
                .toList();
    }

    public void deleteEnrollmentsByStudentId(String studentId) {
        List<Enrollment> enrollments = repository.findByStudentId(studentId);
        if (enrollments.isEmpty()) {
            throw new ResourceNotFoundException("No enrollments found for student: " + studentId);
        }
        repository.deleteAll(enrollments);
    }

    private StudentProfileDTO buildProfile(String studentId) {
        StudentDTO student = getStudentById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found: " + studentId));

        List<String> techStacks = repository.findByStudentId(studentId).stream()
                .map(e -> getTechStackById(e.getTechStackId()).orElse(null))
                .filter(Objects::nonNull)
                .map(TechStackDTO::name)
                .toList();

        return new StudentProfileDTO(student.id(), student.name(), techStacks);
    }

    private boolean isAlreadyEnrolled(String studentId, String techStackId) {
        return repository.findByStudentId(studentId).stream()
                .anyMatch(e -> e.getTechStackId().equals(techStackId));
    }

    // HTTP Client Methods
    private Optional<StudentDTO> getStudentByName(String name) {
        return fetchOne(STUDENT_SERVICE + "/name/" + name, StudentDTO.class);
    }

    private Optional<StudentDTO> getStudentById(String id) {
        return fetchOne(STUDENT_SERVICE + "/" + id, StudentDTO.class);
    }

    private List<StudentDTO> getAllStudents() {
        return fetchList(STUDENT_SERVICE + "/getAllStudents", StudentDTO.class);
    }

    private Optional<TechStackDTO> getTechStackByName(String name) {
        return fetchOne(TECHSTACK_SERVICE + "/name/" + name, TechStackDTO.class);
    }

    private Optional<TechStackDTO> getTechStackById(String id) {
        return fetchOne(TECHSTACK_SERVICE + "/" + id, TechStackDTO.class);
    }

    private <T> Optional<T> fetchOne(String uri, Class<T> type) {
        try {
            return Optional.ofNullable(webClientBuilder.build()
                    .get().uri(uri)
                    .retrieve()
                    .bodyToMono(type)
                    .block());
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    private <T> List<T> fetchList(String uri, Class<T> type) {
        try {
            List<T> result = webClientBuilder.build()
                    .get().uri(uri)
                    .retrieve()
                    .bodyToFlux(type)
                    .collectList()
                    .block();
            return result != null ? result : List.of();
        } catch (Exception e) {
            return List.of();
        }
    }
}
