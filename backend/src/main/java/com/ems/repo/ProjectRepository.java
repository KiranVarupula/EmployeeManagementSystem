package com.ems.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ems.model.Project;

public interface ProjectRepository extends JpaRepository<Project, Long>  {

	List<Project> findByUserId(Long userId);
}
