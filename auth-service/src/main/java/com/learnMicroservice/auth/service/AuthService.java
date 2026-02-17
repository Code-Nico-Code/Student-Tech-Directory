package com.learnMicroservice.auth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.learnMicroservice.auth.dto.AuthResponse;
import com.learnMicroservice.auth.dto.LoginRequest;
import com.learnMicroservice.auth.dto.RegisterRequest;
import com.learnMicroservice.auth.entity.User;
import com.learnMicroservice.auth.repository.UserRepository;

@Service
public class AuthService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private JWTService jwtService;

	private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);

	// Register a new user

	public AuthResponse register(RegisterRequest request) {

		if (userRepository.existsByUsername(request.username())) {
			return new AuthResponse(null, null, null, "Username Already exists");
		}

		User user = new User();
		user.setUsername(request.username());
		user.setPassword(passwordEncoder.encode(request.password()));

		// Always register as USER (secure - ignores any role from request)
		user.setRole("USER");

		userRepository.save(user);

		return new AuthResponse(null, user.getUsername(), user.getRole(), "User registered successfully");

	}

	// Login an user
	public AuthResponse login(LoginRequest request) {

		// Find user by username
		User user = userRepository.findByUsername(request.username())
				.orElse(null);

		// Check if user exists
		if (user == null) {
			return new AuthResponse(null, null, null, "Invalid username or password");
		}

		// Check if password matches
		if (!passwordEncoder.matches(request.password(), user.getPassword())) {
			return new AuthResponse(null, null, null, "Invalid username or password");
		}

		// Generate JWT token
		String token = jwtService.generateToken(user.getUsername(), user.getRole());

		return new AuthResponse(token, user.getUsername(), user.getRole(), "Login successful");
	}

}
