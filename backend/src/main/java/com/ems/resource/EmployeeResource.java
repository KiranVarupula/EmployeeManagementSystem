package com.ems.resource;

import java.util.Arrays;	
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import com.ems.dto.AddEmployeeRequest;
import com.ems.dto.EmployeeLoginRequest;
import com.ems.dto.EmployeeResponse;
import com.ems.dto.EmployeeVerifyRegisterRequest;
import com.ems.model.Employee;
import com.ems.model.OtpVerification;
import com.ems.repo.EmployeeRepository;
import com.ems.repo.OtpVerificationRepository;
import com.ems.service.EmailService;
import com.ems.utility.Helper;

import jakarta.transaction.Transactional;

@Component
@Transactional
public class EmployeeResource {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private OtpVerificationRepository otpVerificationRepository;

    public ResponseEntity<EmployeeResponse> registerUser(AddEmployeeRequest employeeRequest) {
        EmployeeResponse response = new EmployeeResponse();

        // Validate the request
        if (employeeRequest == null || !AddEmployeeRequest.validate(employeeRequest)) {
            response.setResponseMessage("Bad request - missing or invalid request");
            response.setSuccess(false);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        // Validate phone number
        if (employeeRequest.getPhoneNo().length() != 10) {
            response.setResponseMessage("Enter a valid mobile number");
            response.setSuccess(false);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        // Create Employee object
        Employee employee = new Employee();
        employee.setAddress(employeeRequest.getAddress());
        employee.setEmail(employeeRequest.getEmail());
        employee.setEmploymentCode(employeeRequest.getEmploymentCode());
        employee.setFullName(employeeRequest.getFullName());
        employee.setPassword(employeeRequest.getPassword());
        employee.setPhoneNo(employeeRequest.getPhoneNo());
        employee.setRole(employeeRequest.getRole());

        // Generate OTP and send email
        String otp = Helper.generateOTP();
        OtpVerification otpVerification = new OtpVerification();
        otpVerification.setEmailId(employeeRequest.getEmail());
        otpVerification.setOtp(otp);
        otpVerification.setRole(employeeRequest.getRole());
        otpVerificationRepository.save(otpVerification);

        // Send OTP email
        String subject = "EMS - Verify Your Email Address for User Registration";
        String message = "User Registration OTP for EMS: " + otp + ". Please keep it confidential.";
        try {
            emailService.sendEmail(employeeRequest.getEmail(), subject, message);
        } catch (Exception e) {
            System.out.println("Email sending failed: " + e.getMessage());
        }

        response.setEmployees(Arrays.asList(employee));
        response.setResponseMessage("An OTP has been sent to your email. Please verify.");
        response.setSuccess(true);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    public ResponseEntity<EmployeeResponse> loginUser(EmployeeLoginRequest loginRequest) {
        EmployeeResponse response = new EmployeeResponse();

        // Validate the request
        if (loginRequest == null || !EmployeeLoginRequest.validateLoginRequest(loginRequest)) {
            response.setResponseMessage("Bad request - missing or invalid input");
            response.setSuccess(false);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        // Authenticate user
        Employee employee = employeeRepository.findByEmail(loginRequest.getEmailId());
        if (employee == null) {
            response.setResponseMessage("Invalid log in credentials!");
            response.setSuccess(false);
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }

        response.setEmployees(Arrays.asList(employee));
        response.setResponseMessage("Logged in successfully");
        response.setSuccess(true);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    public ResponseEntity<EmployeeResponse> forgetPassword(EmployeeLoginRequest request) {
        EmployeeResponse response = new EmployeeResponse();

        // Validate the request
        if (request == null || !EmployeeLoginRequest.validateForgetRequest(request)) {
            response.setResponseMessage("Bad request - missing or invalid input");
            response.setSuccess(false);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        // Find employee by email
        Employee existingEmployee = employeeRepository.findByEmploymentCode(request.getEmailId());
        if (existingEmployee == null) {
            response.setResponseMessage("User with this email ID does not exist!");
            response.setSuccess(false);
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }

        // Generate OTP for password reset
        String otp = Helper.generateOTP();
        OtpVerification otpVerification = new OtpVerification();
        otpVerification.setEmailId(request.getEmailId());
        otpVerification.setOtp(otp);
        otpVerification.setRole(existingEmployee.getRole());
        otpVerificationRepository.save(otpVerification);

        // Send OTP email
        String subject = "EMS - Verify OTP for Forget Password";
        String message = "Forget Password Verification OTP for EMS: " + otp + ". Please keep it confidential.";
        try {
            emailService.sendEmail(request.getEmailId(), subject, message);
        } catch (Exception e) {
            System.out.println("Email sending failed: " + e.getMessage());
        }

        response.setResponseMessage("An OTP has been sent to your email. Please verify.");
        response.setSuccess(true);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    public ResponseEntity<?> verifyAndRegister(EmployeeVerifyRegisterRequest request) {
        EmployeeResponse response = new EmployeeResponse();

        List<OtpVerification> otpVerifications = otpVerificationRepository.findByEmailId(request.getEmployee().getEmail());
        if (CollectionUtils.isEmpty(otpVerifications)) {
            response.setResponseMessage("Failed to verify the OTP!");
            response.setSuccess(false);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        OtpVerification otpVerification = otpVerifications.get(0);
        if (otpVerification.getOtp().equals(request.getOtp())) {
            Employee registeredUser = employeeRepository.save(request.getEmployee());
            otpVerificationRepository.delete(otpVerification);

            response.setResponseMessage("User registered successfully!");
            response.setSuccess(true);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            otpVerificationRepository.delete(otpVerification);
            response.setResponseMessage("OTP verification failed!");
            response.setSuccess(false);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<?> verifyAndChangePassword(EmployeeVerifyRegisterRequest request) {
        EmployeeResponse response = new EmployeeResponse();

        List<OtpVerification> otpVerifications = otpVerificationRepository.findByEmailId(request.getEmployee().getEmail());
        if (CollectionUtils.isEmpty(otpVerifications)) {
            response.setResponseMessage("Failed to verify the OTP!");
            response.setSuccess(false);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        OtpVerification otpVerification = otpVerifications.get(0);
        if (otpVerification.getOtp().equals(request.getOtp())) {
            Optional<Employee> optional = employeeRepository.findById(request.getEmployee().getId());
            if (optional.isPresent()) {
                Employee employee = optional.get();
                employee.setPassword(request.getEmployee().getPassword());
                employeeRepository.save(employee);
                otpVerificationRepository.delete(otpVerification);

                response.setResponseMessage("Password changed successfully!");
                response.setSuccess(true);
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
                response.setResponseMessage("Employee not found!");
                response.setSuccess(false);
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }
        } else {
            otpVerificationRepository.delete(otpVerification);
            response.setResponseMessage("OTP verification failed!");
            response.setSuccess(false);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }
}
