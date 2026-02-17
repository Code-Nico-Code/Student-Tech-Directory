package com.learnMicroservice.enrollment.dto;

import java.util.List;

public record StudentProfileDTO(String studentId, String studentName, List<String> techStacks) {}
