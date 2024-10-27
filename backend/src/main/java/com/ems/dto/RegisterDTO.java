package com.ems.dto;

public class RegisterDTO {

	 private String fullName;
	    
	    private String email;

	    private String employmentCode;

	    private String password;
	    
	    private String phoneNo;

	    private String role;
	    
	    private String address;

	    public RegisterDTO() {
	    }

		public RegisterDTO(String fullName, String email, String employmentCode, String password, String phoneNo,
				String role, String address) {
			
			this.fullName = fullName;
			this.email = email;
			this.employmentCode = employmentCode;
			this.password = password;
			this.phoneNo = phoneNo;
			this.role = role;
			this.address = address;
		}


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

	}