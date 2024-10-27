package com.ems.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.ems.exception.UserNotFoundException;
import com.ems.model.Project;
import com.ems.repo.ProjectRepository;
import com.ems.repo.UserRepository;

import java.util.List;

@RestController
@CrossOrigin("*") // Use specific origins in production
@RequestMapping("/projects") // All endpoints start with /projects

public class ProjectController {
	    @Autowired
	    private ProjectRepository projectRepository;

	    @Autowired
	    private UserRepository userRepository;

	    // Create a new project (Admin)
	    @PostMapping
	    public Project createProject(@RequestBody Project newProject) {
	        // Validate if the user associated with the project exists
	        userRepository.findById(newProject.getUser().getId())
	                .orElseThrow(() -> new UserNotFoundException(newProject.getUser().getId()));
	        return projectRepository.save(newProject);
	    }

	    // Get all projects (Admin)
	    @GetMapping
	    public List<Project> getAllProjects() {
	        return projectRepository.findAll();
	    }

	    // Get a specific project by its ID (Admin)
	    @GetMapping("/{id}")
	    public Project getProjectById(@PathVariable Long id) {
	        return projectRepository.findById(id)
	                .orElseThrow(() -> new RuntimeException("Project not found with id " + id));
	    }

	    // Update a project (Admin)
	    @PutMapping("/{id}")
	    public Project updateProject(@PathVariable Long id, @RequestBody Project updatedProject) {
	        return projectRepository.findById(id)
	                .map(project -> {
	                    project.setProjectName(updatedProject.getProjectName());
	                    project.setProjectDescription(updatedProject.getProjectDescription());
	                    project.setStartDate(updatedProject.getStartDate());
	                    project.setEndDate(updatedProject.getEndDate());
	                    project.setRoleInProject(updatedProject.getRoleInProject());
	                    project.setStatus(updatedProject.getStatus());
	                    return projectRepository.save(project);
	                }).orElseThrow(() -> new RuntimeException("Project not found with id " + id));
	    }

	    // Delete a project (Admin)
	    @DeleteMapping("/{id}")
	    public String deleteProject(@PathVariable Long id) {
	        if (!projectRepository.existsById(id)) {
	            throw new RuntimeException("Project not found with id " + id);
	        }
	        projectRepository.deleteById(id);
	        return "Project with id " + id + " has been deleted successfully.";
	    }

	    // Get all projects associated with a specific user (Admin)
	    @GetMapping("/user/{userId}")
	    public List<Project> getProjectsByUserId(@PathVariable Long userId) {
	        // Validate if the user exists
	        userRepository.findById(userId)
	                .orElseThrow(() -> new UserNotFoundException(userId));
	        return projectRepository.findByUserId(userId);
	    }

	    // Get all projects assigned to the logged-in employee (Employee view-only)
	    @GetMapping("/employee/projects")
	    public List<Project> getEmployeeProjects(@RequestParam Long userId) {
	        // Validate if the user exists
	        userRepository.findById(userId)
	                .orElseThrow(() -> new UserNotFoundException(userId));
	        return projectRepository.findByUserId(userId);
	    }
}
