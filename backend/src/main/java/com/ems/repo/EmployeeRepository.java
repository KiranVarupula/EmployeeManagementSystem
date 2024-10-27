package com.ems.repo;

import java.util.Optional;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ems.model.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    Employee findByEmail(String email);
    
    Employee findByEmploymentCode(String employmentCode);
    
    // Add method to find employees by role
    List<Employee> findByRole(String role);
}
