package com.learnMicroservices.techstack.service;


import java.util.List;

import org.springframework.stereotype.Service;

import com.learnMicroservices.techstack.entity.TechStack;
import com.learnMicroservices.techstack.exception.DuplicateResourceException;
import com.learnMicroservices.techstack.exception.ResourceNotFoundException;
import com.learnMicroservices.techstack.repository.TechStackRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TechStackService {

	private final TechStackRepository techStackRepository;
	
	public List<TechStack> getAllTechStack(){
		return techStackRepository.findAll();
	}
	
	public TechStack getTechStackById(String id) {
		return techStackRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Tech stack not found with id: " + id));
	}
	
	public TechStack getTechStackByName(String name) {
		return techStackRepository.findByName(name)
				.orElseThrow(() -> new ResourceNotFoundException("Tech stack not found with name: " + name));
	}
	
	public TechStack createTechStack(TechStack techStack) {
		if(techStackRepository.existsByName(techStack.getName())) {
			throw new DuplicateResourceException("Tech Stack with name"+techStack+"already exists");
		}
		return techStackRepository.save(techStack);
	}
	
    public TechStack updateTechStack(String id, TechStack techStackDetails) {
        TechStack techStack = techStackRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tech stack not found with id: " + id));
        
        techStack.setName(techStackDetails.getName());
        return techStackRepository.save(techStack);
    }
    
    public void deleteTechStack(String id) {
        TechStack techStack = techStackRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tech stack not found with id: " + id));
        techStackRepository.delete(techStack);
    }
}
