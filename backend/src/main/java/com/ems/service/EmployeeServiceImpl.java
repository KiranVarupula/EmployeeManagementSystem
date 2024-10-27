//package com.ems.service;
//
//import java.util.Optional;
//import java.util.Random;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import com.ems.dto.LoginDTO;
//import com.ems.dto.RegisterDTO;
//import com.ems.model.Employee;
//import com.ems.model.OtpVerification; // Importing the OtpVerification model
//import com.ems.repo.EmployeeRepository;
//import com.ems.repo.OtpVerificationRepository; // Assuming you have a repository for OtpVerification
//
//@Service
//public class EmployeeServiceImpl implements EmployeeService {
//
//    @Autowired
//    private EmployeeRepository employeeRepository;
//
//    @Autowired
//    private OtpVerificationRepository otpVerificationRepository; // Repository for OTP verification
//
//    @Autowired
//    private EmailService emailService;
//
//    @Override
//    public String registerEmployee(RegisterDTO registerDto) {
//        Optional<Employee> emailExists = employeeRepository.findByEmail(registerDto.getEmail());
//        Optional<Employee> codeExists = employeeRepository.findByEmploymentCode(registerDto.getEmploymentCode());
//
//        if (emailExists.isPresent() || codeExists.isPresent()) {
//            return "Email or Employment code already in use";
//        }
//
//        Employee employee = new Employee();
//        employee.setEmail(registerDto.getEmail());
//        employee.setEmploymentCode(registerDto.getEmploymentCode());
//        employee.setPassword(registerDto.getPassword()); // Use hashed password in production
//        employee.setRole(registerDto.getRole());
//
//        employeeRepository.save(employee);
//
//        // Generate OTP and store it in OtpVerification
//        String otp = generateOtp();
//        OtpVerification otpVerification = new OtpVerification();
//        otpVerification.setEmailId(employee.getEmail());
//        otpVerification.setRole(employee.getRole());
//        otpVerification.setOtp(otp);
//
//        otpVerificationRepository.save(otpVerification); // Save OTP to the database
//
//        // Send OTP email
//        sendOtpEmail(employee.getEmail(), otp);
//
//        return "Employee registered successfully. Please check your email for OTP.";
//    }
//
//    private String generateOtp() {
//        Random random = new Random();
//        return String.format("%06d", random.nextInt(1000000));
//    }
//
//    private void sendOtpEmail(String email, String otp) {
//        String subject = "OTP Verification";
//        String body = "<p>Your OTP for account verification is: <strong>" + otp + "</strong></p>";
//        emailService.sendEmail(email, subject, body);
//    }
//
//    @Override
//    public String loginEmployee(LoginDTO loginDto) {
//        Optional<Employee> employeeOpt = employeeRepository.findByEmail(loginDto.getIdentifier());
//        if (!employeeOpt.isPresent()) {
//            employeeOpt = employeeRepository.findByEmploymentCode(loginDto.getIdentifier());
//        }
//
//        if (!employeeOpt.isPresent()) {
//            return "Invalid credentials";
//        }
//
//        Employee employee = employeeOpt.get();
//
//        // Implement the logic to check for OTP verification if necessary
//        // If needed, you could fetch the corresponding OTP from OtpVerification repository here
//
//        if (!loginDto.getPassword().equals(employee.getPassword())) {
//            return "Invalid credentials";
//        }
//
//        return "Login successful, navigating to " + employee.getRole() + " dashboard";
//    }
//
//    @Override
//    public Boolean verifyOtp(String email, String otp) {
//        // Fetch the OTP verification entry based on the email
//        Optional<OtpVerification> otpVerificationOpt = otpVerificationRepository.findByEmailId(email);
//        
//        if (otpVerificationOpt.isPresent()) {
//            OtpVerification otpVerification = otpVerificationOpt.get();
//
//            // Check if the OTP matches
//            if (otpVerification.getOtp().equals(otp)) {
//                // Remove the OTP entry after successful verification
//                otpVerificationRepository.delete(otpVerification);
//                return true; // Verification successful
//            }
//        }
//        return false; // Verification failed
//    }
//
//}
//
//
//
////package com.ems.service;
////
////import java.util.Optional;
////import java.util.Random;
////
////import org.springframework.beans.factory.annotation.Autowired;
////import org.springframework.stereotype.Service;
////
////import com.ems.dto.LoginDTO;
////import com.ems.dto.RegisterDTO;
////import com.ems.model.Employee;
////import com.ems.repo.EmployeeRepository;
////
////@Service
////public class EmployeeServiceImpl implements EmployeeService {
////
////    @Autowired
////    private EmployeeRepository employeeRepository;
////
////    @Autowired
////    private EmailService emailService;
////
////    @Override
////    public String registerEmployee(RegisterDTO registerDto) {
////        Optional<Employee> emailExists = employeeRepository.findByEmail(registerDto.getEmail());
////        Optional<Employee> codeExists = employeeRepository.findByEmploymentCode(registerDto.getEmploymentCode());
////
////        if (emailExists.isPresent() || codeExists.isPresent()) {
////            return "Email or Employment code already in use";
////        }
////
////        Employee employee = new Employee();
////        employee.setEmail(registerDto.getEmail());
////        employee.setEmploymentCode(registerDto.getEmploymentCode());
////        employee.setPassword(registerDto.getPassword()); // Use hashed password in production
////        employee.setVerified(registerDto.isVerified());
////        employee.setOtp(registerDto.getOtp());
////        employee.setRole(registerDto.getRole());
////
////        employeeRepository.save(employee);
////
////        String otp = generateOtp();
////        employee.setOtp(otp);
////        employeeRepository.save(employee);
////
////        String subject = "OTP Verification";
////        String body = "<p>Your OTP for account verification is: <strong>" + otp + "</strong></p>";
////        emailService.sendEmail(employee.getEmail(), subject, body);
////
////        return "Employee registered successfully. Please check your email for OTP.";
////    }
////
////    private String generateOtp() {
////        Random random = new Random();
////        return String.format("%06d", random.nextInt(1000000));
////    }
////
////    @Override
////    public String loginEmployee(LoginDTO loginDto) {
////        Optional<Employee> employeeOpt = employeeRepository.findByEmail(loginDto.getIdentifier());
////        if (!employeeOpt.isPresent()) {
////            employeeOpt = employeeRepository.findByEmploymentCode(loginDto.getIdentifier());
////        }
////
////        if (!employeeOpt.isPresent()) {
////            return "Invalid credentials";
////        }
////
////        Employee employee = employeeOpt.get();
////
////        if (!employee.isVerified()) {
////            return "Account not verified. Please verify your account using the OTP sent to your email.";
////        }
////
////        if (!loginDto.getPassword().equals(employee.getPassword())) {
////            return "Invalid credentials";
////        }
////
////        return "Login successful, navigating to " + employee.getRole() + " dashboard";
////    }
////
////    @Override
////    public Boolean verifyOtp(String email, String otp) {
////        Optional<Employee> employeeOpt = employeeRepository.findByEmail(email);
////        if (employeeOpt.isPresent()) {
////            Employee employee = employeeOpt.get();
////
////            if (employee.getOtp().equals(otp)) {
////                employee.setVerified(true);
////                employee.setOtp(null);
////                employeeRepository.save(employee);
////                return true;
////            }
////        }
////        return false;
////    }
////}
