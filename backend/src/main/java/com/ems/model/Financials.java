package com.ems.model;

import java.sql.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Financials {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Foreign key linked to User table's id

    private String compName;
    private String compLogo; // URL or file reference for the company logo
    //company name
    private String bankName;
    private String bankAccount;
    private String bankIFSC;
    private Double empCTC;
    private Double basicSalary;
    private Double pf;
    private Double hra;
    private Double medicalAllowances;
    private Double foodAllowances;
    private Double netSalary;
    private String salaryMonth;
    private Double bonus;
    private Double taxDeductions;
    private Double netSalaryAfterTax; // Adjusted net salary field to clarify it's after deductions
    private Date dateOfPayment;
    private String paymentMethod;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user; // Link to the User entity

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCompName() {
		return compName;
	}

	public void setCompName(String compName) {
		this.compName = compName;
	}

	public String getCompLogo() {
		return compLogo;
	}

	public void setCompLogo(String compLogo) {
		this.compLogo = compLogo;
	}

	public String getBankName() {
		return bankName;
	}

	public void setBankName(String bankName) {
		this.bankName = bankName;
	}

	public String getBankAccount() {
		return bankAccount;
	}

	public void setBankAccount(String bankAccount) {
		this.bankAccount = bankAccount;
	}

	public String getBankIFSC() {
		return bankIFSC;
	}

	public void setBankIFSC(String bankIFSC) {
		this.bankIFSC = bankIFSC;
	}

	public Double getEmpCTC() {
		return empCTC;
	}

	public void setEmpCTC(Double empCTC) {
		this.empCTC = empCTC;
	}

	public Double getBasicSalary() {
		return basicSalary;
	}

	public void setBasicSalary(Double basicSalary) {
		this.basicSalary = basicSalary;
	}

	public Double getPf() {
		return pf;
	}

	public void setPf(Double pf) {
		this.pf = pf;
	}

	public Double getHra() {
		return hra;
	}

	public void setHra(Double hra) {
		this.hra = hra;
	}

	public Double getMedicalAllowances() {
		return medicalAllowances;
	}

	public void setMedicalAllowances(Double medicalAllowances) {
		this.medicalAllowances = medicalAllowances;
	}

	public Double getFoodAllowances() {
		return foodAllowances;
	}

	public void setFoodAllowances(Double foodAllowances) {
		this.foodAllowances = foodAllowances;
	}

	public Double getNetSalary() {
		return netSalary;
	}

	public void setNetSalary(Double netSalary) {
		this.netSalary = netSalary;
	}

	public String getSalaryMonth() {
		return salaryMonth;
	}

	public void setSalaryMonth(String salaryMonth) {
		this.salaryMonth = salaryMonth;
	}

	public Double getBonus() {
		return bonus;
	}

	public void setBonus(Double bonus) {
		this.bonus = bonus;
	}

	public Double getTaxDeductions() {
		return taxDeductions;
	}

	public void setTaxDeductions(Double taxDeductions) {
		this.taxDeductions = taxDeductions;
	}

	public Double getNetSalaryAfterTax() {
		return netSalaryAfterTax;
	}

	public void setNetSalaryAfterTax(Double netSalaryAfterTax) {
		this.netSalaryAfterTax = netSalaryAfterTax;
	}

	public Date getDateOfPayment() {
		return dateOfPayment;
	}

	public void setDateOfPayment(Date dateOfPayment) {
		this.dateOfPayment = dateOfPayment;
	}

	public String getPaymentMethod() {
		return paymentMethod;
	}

	public void setPaymentMethod(String paymentMethod) {
		this.paymentMethod = paymentMethod;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Financials() {
		
	}

	public Financials(Long id, String compName, String compLogo, String bankName, String bankAccount, String bankIFSC,
			Double empCTC, Double basicSalary, Double pf, Double hra, Double medicalAllowances, Double foodAllowances,
			Double netSalary, String salaryMonth, Double bonus, Double taxDeductions, Double netSalaryAfterTax,
			Date dateOfPayment, String paymentMethod, User user) {
		this.id = id;
		this.compName = compName;
		this.compLogo = compLogo;
		this.bankName = bankName;
		this.bankAccount = bankAccount;
		this.bankIFSC = bankIFSC;
		this.empCTC = empCTC;
		this.basicSalary = basicSalary;
		this.pf = pf;
		this.hra = hra;
		this.medicalAllowances = medicalAllowances;
		this.foodAllowances = foodAllowances;
		this.netSalary = netSalary;
		this.salaryMonth = salaryMonth;
		this.bonus = bonus;
		this.taxDeductions = taxDeductions;
		this.netSalaryAfterTax = netSalaryAfterTax;
		this.dateOfPayment = dateOfPayment;
		this.paymentMethod = paymentMethod;
		this.user = user;
	}
    
    
}
