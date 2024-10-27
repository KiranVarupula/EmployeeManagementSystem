package com.ems.controller;

import org.springframework.beans.factory.annotation.Autowired;	
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ems.dto.AddEmployeeRequest;
import com.ems.dto.EmployeeLoginRequest;
import com.ems.dto.EmployeeResponse;
import com.ems.dto.EmployeeVerifyRegisterRequest;
import com.ems.resource.EmployeeResource;


@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class EmployeeController {

    @Autowired
    EmployeeResource employeeResource;

    // Endpoint for registering a new employee
    @PostMapping("/register")
    public ResponseEntity<EmployeeResponse> registerUser(@RequestBody AddEmployeeRequest employeeRequest) {
        return this.employeeResource.registerUser(employeeRequest);
    }

    @PostMapping("/verify-register")
    public ResponseEntity<?> verifyAndRegister(@RequestBody EmployeeVerifyRegisterRequest request) {
        return this.employeeResource.verifyAndRegister(request);
    }
    
    // Endpoint for employee login
    @PostMapping("/login")
    public ResponseEntity<EmployeeResponse> loginUser(@RequestBody EmployeeLoginRequest loginRequest) {
        return this.employeeResource.loginUser(loginRequest);
    }

    // Endpoint for forgetting the password
    @PostMapping("/forget-password")
    public ResponseEntity<EmployeeResponse> forgetPassword(@RequestBody EmployeeLoginRequest request) {
        return this.employeeResource.forgetPassword(request);
    }

 
    

    // Endpoint for verifying OTP and changing the password
    @PostMapping("/verify-change-password")
    public ResponseEntity<?> verifyAndChangePassword(@RequestBody EmployeeVerifyRegisterRequest request) {
        return this.employeeResource.verifyAndChangePassword(request);
    }
}


//    @Autowired
//    private EmployeeService employeeService;
//
//    @PostMapping("register")
//	public ResponseEntity<EmployeeResponse> registerUser(@RequestBody AddEmployeeRequest userRequest) {
//		return this.employee.registerUser(userRequest);
//	}
//
//	@PostMapping("verify/register")
//	public ResponseEntity<?> verifyAndRegister(@RequestBody UserVerifyRegisterRequest request) {
//		return this.userResource.verifyAndRegister(request);
//	}
//
//	@PostMapping("login")
//	public ResponseEntity<UserResponse> loginUser(@RequestBody UserLoginRequest loginRequest) {
//		return this.userResource.loginUser(loginRequest);
//	}
//    }



//package com.ems.controller;
//
//import java.util.Map;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import com.ems.dto.LoginDTO;
//import com.ems.dto.RegisterDTO;
//import com.ems.model.Employee;
//import com.ems.service.EmployeeService;
//
//@RestController
//@RequestMapping("/api/employees")
//public class EmployeeController {
//
//    @Autowired
//    private EmployeeService employeeService;
//
//    @PostMapping("/register")
//    public ResponseEntity<String> registerEmployee(@RequestBody RegisterDTO registerDto) {
//        String response = employeeService.registerEmployee(registerDto);
//        return ResponseEntity.ok(response);
//    }
//
//
//    @PostMapping("/verify-otp")
//    public ResponseEntity<String> verifyOtp(@RequestBody Map<String, String> params) {
//        String email = params.get("email");
//        String otp = params.get("otp");
//        
//        Boolean isVerified = employeeService.verifyOtp(email, otp);
//        if (isVerified) {
//            return ResponseEntity.ok("OTP verified successfully. Your account is now activated.");
//        } else {
//            return ResponseEntity.status(400).body("OTP verification failed. Please check the OTP and try again.");
//        }
//    }
//    
//    @PostMapping("/login")
//    public ResponseEntity<String> loginEmployee(@RequestBody LoginDTO loginDto) {
//        String response = employeeService.loginEmployee(loginDto);
//        return ResponseEntity.ok(response);
//    }
//
//   
//}
