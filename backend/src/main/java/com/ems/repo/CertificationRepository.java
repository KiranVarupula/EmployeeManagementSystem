package com.ems.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ems.model.Certification;

public interface CertificationRepository extends JpaRepository<Certification, Long>  {
	
	 List<Certification> findByUserId(Long userId);


}
