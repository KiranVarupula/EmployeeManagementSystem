package com.ems.dto;

import com.ems.model.Employee;

public class EmployeeVerifyRegisterRequest {

	private Employee employee;

	private String otp;

	public Employee getEmployee() {
		return employee;
	}

	public void setEmployee(Employee employee) {
		this.employee = employee;
	}

	public String getOtp() {
		return otp;
	}

	public void setOtp(String otp) {
		this.otp = otp;
	}

	
	
}
