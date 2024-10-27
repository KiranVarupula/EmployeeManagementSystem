package com.ems.model;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "user_details")
public class User {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;
    private String profilePicture;
    private Date dateOfBirth;
    private String email;
    private String phoneNumber;
    private String department;
    private String position;
    private Date dateOfHire;
    private double salary;
    private String address;
    private String gender; // Added gender field
    private String temporaryAddress; // Added temporary address field
	
    
    public User() {
		
	}


	public User(Long id, String fullName, String profilePicture, Date dateOfBirth, String email,
			String phoneNumber, String department, String position, Date dateOfHire, double salary, String address,
			String gender, String temporaryAddress) {
		
		this.id = id;
		this.fullName = fullName;
		this.profilePicture = profilePicture;
		this.dateOfBirth = dateOfBirth;
		this.email = email;
		this.phoneNumber = phoneNumber;
		this.department = department;
		this.position = position;
		this.dateOfHire = dateOfHire;
		this.salary = salary;
		this.address = address;
		this.gender = gender;
		this.temporaryAddress = temporaryAddress;
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


	public String getProfilePicture() {
		return profilePicture;
	}


	public void setProfilePicture(String profilePicture) {
		this.profilePicture = profilePicture;
	}


	public Date getDateOfBirth() {
		return dateOfBirth;
	}


	public void setDateOfBirth(Date dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	public String getPhoneNumber() {
		return phoneNumber;
	}


	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}


	public String getDepartment() {
		return department;
	}


	public void setDepartment(String department) {
		this.department = department;
	}


	public String getPosition() {
		return position;
	}


	public void setPosition(String position) {
		this.position = position;
	}


	public Date getDateOfHire() {
		return dateOfHire;
	}


	public void setDateOfHire(Date dateOfHire) {
		this.dateOfHire = dateOfHire;
	}


	public double getSalary() {
		return salary;
	}


	public void setSalary(double salary) {
		this.salary = salary;
	}


	public String getAddress() {
		return address;
	}


	public void setAddress(String address) {
		this.address = address;
	}


	public String getGender() {
		return gender;
	}


	public void setGender(String gender) {
		this.gender = gender;
	}


	public String getTemporaryAddress() {
		return temporaryAddress;
	}


	public void setTemporaryAddress(String temporaryAddress) {
		this.temporaryAddress = temporaryAddress;
	}   
    
}
