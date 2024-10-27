package com.ems.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ems.model.Financials;

public interface FinancialsRepository extends JpaRepository<Financials, Long> {

	 List<Financials> findByUserId(Long userId); // Fetch financial records for a specific user
	
}
