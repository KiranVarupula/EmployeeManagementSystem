package com.ems.model;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;

@Entity
public class Certification {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "certification_id", unique = true)
    private Long certificationId;

    private String certificationName;
    private String certificationIssuer;
    private Date dateOfIssuance;
    private Date expirationDate;
    private String certificationStatus;
    private String certificationType;
    private String credentialUrl;
    private String description;
    private String skillsAcquired;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user; // Link to the User entity
    
  

    public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getCertificationId() {
		return certificationId;
	}

	public void setCertificationId(Long certificationId) {
		this.certificationId = certificationId;
	}

	public String getCertificationName() {
		return certificationName;
	}

	public void setCertificationName(String certificationName) {
		this.certificationName = certificationName;
	}

	public String getCertificationIssuer() {
		return certificationIssuer;
	}

	public void setCertificationIssuer(String certificationIssuer) {
		this.certificationIssuer = certificationIssuer;
	}

	public Date getDateOfIssuance() {
		return dateOfIssuance;
	}

	public void setDateOfIssuance(Date dateOfIssuance) {
		this.dateOfIssuance = dateOfIssuance;
	}

	public Date getExpirationDate() {
		return expirationDate;
	}

	public void setExpirationDate(Date expirationDate) {
		this.expirationDate = expirationDate;
	}

	public String getCertificationStatus() {
		return certificationStatus;
	}

	public void setCertificationStatus(String certificationStatus) {
		this.certificationStatus = certificationStatus;
	}

	public String getCertificationType() {
		return certificationType;
	}

	public void setCertificationType(String certificationType) {
		this.certificationType = certificationType;
	}

	public String getCredentialUrl() {
		return credentialUrl;
	}

	public void setCredentialUrl(String credentialUrl) {
		this.credentialUrl = credentialUrl;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getSkillsAcquired() {
		return skillsAcquired;
	}

	public void setSkillsAcquired(String skillsAcquired) {
		this.skillsAcquired = skillsAcquired;
	}
	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	

	public Certification() {
		
	}
	
	public Certification(Long id, Long certificationId, String certificationName, String certificationIssuer,
			Date dateOfIssuance, Date expirationDate, String certificationStatus, String certificationType,
			String credentialUrl, String description, String skillsAcquired, User user) {
		
		this.id = id;
		this.certificationId = certificationId;
		this.certificationName = certificationName;
		this.certificationIssuer = certificationIssuer;
		this.dateOfIssuance = dateOfIssuance;
		this.expirationDate = expirationDate;
		this.certificationStatus = certificationStatus;
		this.certificationType = certificationType;
		this.credentialUrl = credentialUrl;
		this.description = description;
		this.skillsAcquired = skillsAcquired;
		this.user = user;
	}

	@PrePersist
    public void generateCertificationId() {
        if (this.certificationId == null) {
            // Generate a random 5-digit number
            this.certificationId = (long) (10000 + Math.random() * 90000);
        }

	}
	
}
