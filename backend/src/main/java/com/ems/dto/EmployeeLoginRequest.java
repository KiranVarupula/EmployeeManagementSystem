package com.ems.dto;

public class EmployeeLoginRequest {

    private String emailId;      // Email ID of the employee
    private String password;      // Current password of the employee
    private String role;          // Role of the employee (e.g., Admin, Employee)
    private String newPassword;   // New password for the employee

    // Getters and Setters
    public String getEmailId() {
        return emailId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }

    @Override
    public String toString() {
        return "EmployeeLoginRequest [emailId=" + emailId + ", password=" + password + ", role=" + role
                + ", newPassword=" + newPassword + "]";
    } 
    
    // Validate login request for null fields
    public static boolean validateLoginRequest(EmployeeLoginRequest request) {
        if (request.getEmailId() == null || request.getPassword() == null || request.getRole() == null) {
            return false; // Return false if any required field is null
        }
        return true; // Return true if all required fields are present
    }

    // Validate password reset request for null fields
    public static boolean validateForgetRequest(EmployeeLoginRequest request) {
        if (request.getEmailId() == null || request.getNewPassword() == null) {
            return false; // Return false if any required field is null
        }
        return true; // Return true if all required fields are present
    }
}
