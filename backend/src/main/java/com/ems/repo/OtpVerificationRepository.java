package com.ems.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ems.model.OtpVerification;

import java.util.List;
import java.util.Optional;

public interface OtpVerificationRepository extends JpaRepository<OtpVerification, Integer> {
    
	List<OtpVerification> findByEmailId(String emailId); // Method to find by email ID
}
