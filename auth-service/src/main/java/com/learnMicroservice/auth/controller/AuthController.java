package com.learnMicroservice.auth.controller;

import com.learnMicroservice.auth.dto.AuthResponse;
import com.learnMicroservice.auth.dto.LoginRequest;
import com.learnMicroservice.auth.dto.RegisterRequest;
import com.learnMicroservice.auth.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        AuthResponse response = authService.register(request);

        if (response.token() == null && response.message().contains("exists")) {
            return ResponseEntity.badRequest().body(response);
        }

        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);

        if (response.token() == null) {
            return ResponseEntity.status(401).body(response);
        }

        return ResponseEntity.ok(response);
    }
    
}