package com.ems.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.ems.exception.UserNotFoundException;
import com.ems.model.User;
import com.ems.repo.UserRepository;

import java.util.List; 
@RestController
@CrossOrigin("*") // Use this cautiously in production (specific origins recommended)
@RequestMapping("/api") // Grouping routes under `/api` path
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // Create a new user (Admin)
    @PostMapping("/user")
    public User newUser(@RequestBody User newUser) {
        return userRepository.save(newUser);
    }

    // Get all users (Admin)
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Get user by ID (Admin)
    @GetMapping("/user/{id}")
    public User getUserById(@PathVariable Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
    }

    // Update a user's details (Admin)
    @PutMapping("/user/{id}")
    public User updateUser(@RequestBody User updatedUser, @PathVariable Long id) {
        return userRepository.findById(id)
                .map(user -> {
                    user.setFullName(updatedUser.getFullName());
                    user.setProfilePicture(updatedUser.getProfilePicture());
                    user.setDateOfBirth(updatedUser.getDateOfBirth());
                    user.setEmail(updatedUser.getEmail());
                    user.setPhoneNumber(updatedUser.getPhoneNumber());
                    user.setDepartment(updatedUser.getDepartment());
                    user.setPosition(updatedUser.getPosition());
                    user.setDateOfHire(updatedUser.getDateOfHire());
                    user.setSalary(updatedUser.getSalary());
                    user.setAddress(updatedUser.getAddress());
                    user.setGender(updatedUser.getGender());
                    user.setTemporaryAddress(updatedUser.getTemporaryAddress());
                    return userRepository.save(user);
                }).orElseThrow(() -> new UserNotFoundException(id));
    }

    // Delete a user (Admin)
    @DeleteMapping("/user/{id}")
    public String deleteUser(@PathVariable Long id) {
        if (!userRepository.existsById(id)) {
            throw new UserNotFoundException(id);
        }
        userRepository.deleteById(id);
        return "User with id " + id + " has been deleted successfully.";
    }

    // Get employee profile (Employee view-only)
    @GetMapping("/employee/profile")
    public User getEmployeeProfile(@RequestParam String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User with email " + email + " not found"));
    }
}
