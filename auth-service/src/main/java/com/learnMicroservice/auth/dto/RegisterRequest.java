package com.learnMicroservice.auth.dto;

public record RegisterRequest(String username, String password, String role) {
}
