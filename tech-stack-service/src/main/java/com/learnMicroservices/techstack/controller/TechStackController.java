package com.learnMicroservices.techstack.controller;

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

import com.learnMicroservices.techstack.entity.TechStack;
import com.learnMicroservices.techstack.service.TechStackService;
import com.learnMicroservices.techstack.util.RoleChecker;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/techstacks")
@RequiredArgsConstructor
public class TechStackController {

	private final TechStackService techStackService;
	private final RoleChecker roleChecker;

	@GetMapping("/getAllTechStacks")
	@Operation(summary = "Get all tech stacks")
	public ResponseEntity<List<TechStack>> getAllTechStacks() {
		return ResponseEntity.ok(techStackService.getAllTechStack());
	}

	@GetMapping("/{id}")
	@Operation(summary = "Get tech stack by ID")
	public ResponseEntity<TechStack> getTechStackById(@PathVariable String id) {
		TechStack techStack = techStackService.getTechStackById(id);
		return ResponseEntity.ok(techStack);
	}

	@GetMapping("/name/{name}")
	@Operation(summary = "Get tech stack by name")
	public ResponseEntity<TechStack> getTechStackByName(@PathVariable String name) {
		TechStack techStack = techStackService.getTechStackByName(name);
		return ResponseEntity.ok(techStack);
	}

	@PostMapping("/createTechStack")
	@Operation(summary = "Create new tech stack - ADMIN only")
	public ResponseEntity<TechStack> createTechStack(
			@RequestBody TechStack techStack,
			@RequestHeader(value = "X-User-Role", required = false) String role) {

		roleChecker.requireAdmin(role);
		TechStack createdTechStack = techStackService.createTechStack(techStack);
		return ResponseEntity.status(HttpStatus.CREATED).body(createdTechStack);
	}

	@PutMapping("/{id}")
	@Operation(summary = "Update tech stack - ADMIN only")
	public ResponseEntity<TechStack> updateTechStack(
			@PathVariable String id,
			@RequestBody TechStack techStack,
			@RequestHeader(value = "X-User-Role", required = false) String role) {

		roleChecker.requireAdmin(role);
		TechStack updatedTechStack = techStackService.updateTechStack(id, techStack);
		return ResponseEntity.ok(updatedTechStack);
	}

	@DeleteMapping("/{id}")
	@Operation(summary = "Delete tech stack - ADMIN only")
	public ResponseEntity<String> deleteTechStack(
			@PathVariable String id,
			@RequestHeader(value = "X-User-Role", required = false) String role) {

		roleChecker.requireAdmin(role);
		techStackService.deleteTechStack(id);
		return ResponseEntity.ok("Tech stack deleted successfully");
	}

}
