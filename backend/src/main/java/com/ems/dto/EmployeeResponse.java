package com.ems.dto;

import java.util.ArrayList;	
import java.util.List;

import com.ems.model.Employee;

public class EmployeeResponse extends CommonApiResponse {

    private List<Employee> employees; // Changed to 'employees' for clarity

//    // Default constructor
//    public EmployeeResponse() {
//        this.employees = new ArrayList<>(); // Initialize the list
//    }
//
//    // Parameterized constructor
//    public EmployeeResponse(List<Employee> employees) {
//        this.employees = employees != null ? employees : new ArrayList<>(); // Avoid null list
//    }

    // Getter for employees
    public List<Employee> getEmployees() {
        return employees;
    }

    // Setter for employees
    public void setEmployees(List<Employee> employees) {
        this.employees = employees != null ? employees : new ArrayList<>(); // Avoid null list
    }
}
