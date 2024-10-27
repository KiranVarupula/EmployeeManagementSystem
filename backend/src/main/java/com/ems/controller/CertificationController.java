package com.ems.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ems.exception.UserNotFoundException;
import com.ems.model.Certification;
import com.ems.repo.CertificationRepository;
import com.ems.repo.UserRepository;

/* Created by Arjun Gautam */
@RestController
@CrossOrigin("*")  // Allows all domains to access your API (use with caution)
@RequestMapping("/certifications") // Set a common base path for certifications
public class CertificationController {

	 @Autowired
	    private CertificationRepository certificationRepository;

	    @Autowired
	    private UserRepository userRepository; // Added for user validation

	    // Create a new certification
	    @PostMapping
	    public Certification createCertification(@RequestBody Certification newCertification) {
	        // Validate that the associated user exists (assuming a user is linked to the certification)
	        userRepository.findById(newCertification.getUser().getId())
	                .orElseThrow(() -> new UserNotFoundException(newCertification.getUser().getId()));
	        return certificationRepository.save(newCertification);
	    }

	    // Retrieve all certifications
	    @GetMapping
	    public List<Certification> getAllCertifications() {
	        return certificationRepository.findAll();
	    }

	    // Retrieve a certification by ID
	    @GetMapping("/{id}")
	    public Certification getCertificationById(@PathVariable Long id) {
	        return certificationRepository.findById(id)
	                .orElseThrow(() -> new UserNotFoundException(id));
	    }

	    // Update a certification
	    @PutMapping("/{id}")
	    public Certification updateCertification(@RequestBody Certification updatedCertification, @PathVariable Long id) {
	        return certificationRepository.findById(id)
	                .map(certification -> {
	                    // Update fields as required
	                    certification.setCertificationId(updatedCertification.getCertificationId());
	                    certification.setCertificationName(updatedCertification.getCertificationName());
	                    certification.setCertificationIssuer(updatedCertification.getCertificationIssuer());
	                    certification.setDateOfIssuance(updatedCertification.getDateOfIssuance());
	                    certification.setExpirationDate(updatedCertification.getExpirationDate());
	                    certification.setCertificationStatus(updatedCertification.getCertificationStatus());
	                    certification.setCertificationType(updatedCertification.getCertificationType());
	                    certification.setCredentialUrl(updatedCertification.getCredentialUrl());
	                    certification.setDescription(updatedCertification.getDescription());
	                    certification.setSkillsAcquired(updatedCertification.getSkillsAcquired());
	                    return certificationRepository.save(certification);
	                })
	                .orElseThrow(() -> new UserNotFoundException(id));
	    }

	    // Delete a certification
	    @DeleteMapping("/{id}")
	    public String deleteCertification(@PathVariable Long id) {
	        if (!certificationRepository.existsById(id)) {
	            throw new UserNotFoundException(id);
	        }
	        certificationRepository.deleteById(id);
	        return "Certification with id " + id + " has been deleted successfully.";
	    }

	    // Get certifications for a specific employee
	    @GetMapping("/employee")
	    public List<Certification> getEmployeeCertifications(@RequestParam Long userId) {
	        // Validate that the associated user exists
	        userRepository.findById(userId)
	                .orElseThrow(() -> new UserNotFoundException(userId));
	        return certificationRepository.findByUserId(userId);
	    }
}
