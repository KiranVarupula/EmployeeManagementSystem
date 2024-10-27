package com.ems.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;
    
    private String email;

    private String employmentCode;

    private String password;
    
    private String phoneNo;

    private String role;
    
    private String address;

    public Employee() {
    }

	public Employee(Long id, String fullName, String email, String employmentCode, String password, String phoneNo,
			String role, String address) {
		super();
		this.id = id;
		this.fullName = fullName;
		this.email = email;
		this.employmentCode = employmentCode;
		this.password = password;
		this.phoneNo = phoneNo;
		this.role = role;
		this.address = address;
	}

	public Long getId() {
		return id;
	}  

	public void setId(Long id) {
		this.id = id;
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


//package com.ems.model;
//
//import jakarta.persistence.Entity;
//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.GenerationType;
//import jakarta.persistence.Id;
//
//@Entity
//public class Employee {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    private String email;
//
//    private String employmentCode;
//
//    private String password;
//
//    private String role;
//
//    public Employee() {
//    }
//
//    public Employee(Long id, String email, String employmentCode, String password, String role) {
//        this.id = id;
//        this.email = email;
//        this.employmentCode = employmentCode;
//        this.password = password;
//        this.role = role;
//    }
//
//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    public String getEmail() {
//        return email;
//    }
//
//    public void setEmail(String email) {
//        this.email = email;
//    }
//
//    public String getEmploymentCode() {
//        return employmentCode;
//    }
//
//    public void setEmploymentCode(String employmentCode) {
//        this.employmentCode = employmentCode;
//    }
//
//    public String getPassword() {
//        return password;
//    }
//
//    public void setPassword(String password) {
//        this.password = password;
//    }
//
//    public String getRole() {
//        return role;
//    }
//
//    public void setRole(String role) {
//        this.role = role;
//    }
//}
