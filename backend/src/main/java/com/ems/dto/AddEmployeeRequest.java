package com.ems.dto;

public class AddEmployeeRequest {

    private String fullName;         // Full name of the employee
    private String email;            // Email of the employee
    private String employmentCode;   // Unique code for employment
    private String password;         // Password for the employee's account
    private String phoneNo;          // Phone number of the employee
    private String role;             // Role of the employee (e.g., Admin, Employee)
    private String address;          // Address of the employee

    // Getters and Setters
    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEmploymentCode() {
        return employmentCode;
    }

    public void setEmploymentCode(String employmentCode) {
        this.employmentCode = employmentCode;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhoneNo() {
        return phoneNo;
    }

    public void setPhoneNo(String phoneNo) {
        this.phoneNo = phoneNo;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    @Override
    public String toString() {
        return "AddEmployeeRequest [fullName=" + fullName + ", email=" + email + ", employmentCode=" + employmentCode
                + ", password=" + password + ", phoneNo=" + phoneNo + ", role=" + role + ", address=" + address + "]";
    }

    // Validation method to check for null fields
    public static boolean validate(AddEmployeeRequest request) {
        // Check for null values in the required fields
        if (request.getFullName() == null || 
            request.getEmail() == null || 
            request.getEmploymentCode() == null ||
            request.getPassword() == null || 
            request.getPhoneNo() == null || 
            request.getRole() == null || 
            request.getAddress() == null) {
            return false; // Return false if any required field is null
        }
        // Additional validation logic can be added here (e.g., email format, password strength)

        return true; // Return true if all required fields are valid
    }
}
