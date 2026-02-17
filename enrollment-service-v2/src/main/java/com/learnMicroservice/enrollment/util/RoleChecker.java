package com.learnMicroservice.enrollment.util;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

@Component
public class RoleChecker {

    public void requireAdmin(String role) {
        if (!"ADMIN".equals(role)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN,
                    "Access denied. Only ADMIN can perform this action.");
        }
    }

    public void requireUser(String role) {
        if (!"USER".equals(role)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN,
                    "Access denied. Only USER can perform this action.");
        }
    }
}
