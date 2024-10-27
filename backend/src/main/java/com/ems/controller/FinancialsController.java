package com.ems.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ems.exception.UserNotFoundException;
import com.ems.model.Financials;
import com.ems.repo.FinancialsRepository;
import com.ems.repo.UserRepository;

@RestController
@CrossOrigin("*") // Use specific origins in production
@RequestMapping("/financials")
public class FinancialsController {

    @Autowired
    private FinancialsRepository financialsRepository;

    @Autowired
    private UserRepository userRepository;

    // Create a new financial record (Admin only)
    @PostMapping
    public Financials createFinancials(@RequestBody Financials newFinancials) {
        // Validate that the associated user exists
        userRepository.findById(newFinancials.getUser().getId())
                .orElseThrow(() -> new UserNotFoundException(newFinancials.getUser().getId()));
        return financialsRepository.save(newFinancials);
    }

    // Get all financial records (Admin)
    @GetMapping
    public List<Financials> getAllFinancials() {
        return financialsRepository.findAll();
    }

    // Get a specific financial record by ID (Admin)
    @GetMapping("/{id}")
    public Financials getFinancialsById(@PathVariable Long id) {
        return financialsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Financial record not found with id " + id));
    }

    // Update a financial record (Admin only)
    @PutMapping("/{id}")
    public Financials updateFinancials(@PathVariable Long id, @RequestBody Financials updatedFinancials) {
        return financialsRepository.findById(id)
                .map(financials -> {
                    // Update fields as required
                    financials.setCompName(updatedFinancials.getCompName());
                    financials.setCompLogo(updatedFinancials.getCompLogo());
                    financials.setBankName(updatedFinancials.getBankName());
                    financials.setBankAccount(updatedFinancials.getBankAccount());
                    financials.setBankIFSC(updatedFinancials.getBankIFSC());
                    financials.setEmpCTC(updatedFinancials.getEmpCTC());
                    financials.setBasicSalary(updatedFinancials.getBasicSalary());
                    financials.setPf(updatedFinancials.getPf());
                    financials.setHra(updatedFinancials.getHra());
                    financials.setMedicalAllowances(updatedFinancials.getMedicalAllowances());
                    financials.setFoodAllowances(updatedFinancials.getFoodAllowances());
                    financials.setNetSalary(updatedFinancials.getNetSalary());
                    financials.setSalaryMonth(updatedFinancials.getSalaryMonth());
                    financials.setBonus(updatedFinancials.getBonus());
                    financials.setTaxDeductions(updatedFinancials.getTaxDeductions());
                    financials.setNetSalaryAfterTax(updatedFinancials.getNetSalaryAfterTax());
                    financials.setDateOfPayment(updatedFinancials.getDateOfPayment());
                    financials.setPaymentMethod(updatedFinancials.getPaymentMethod());
                    return financialsRepository.save(financials);
                }).orElseThrow(() -> new RuntimeException("Financial record not found with id " + id));
    }

    // Delete a financial record (Admin only)
    @DeleteMapping("/{id}")
    public String deleteFinancials(@PathVariable Long id) {
        if (!financialsRepository.existsById(id)) {
            throw new RuntimeException("Financial record not found with id " + id);
        }
        financialsRepository.deleteById(id);
        return "Financial record with id " + id + " has been deleted successfully.";
    }

    // Get financial records by user ID (Admin)
    @GetMapping("/user/{userId}")
    public List<Financials> getFinancialsByUserId(@PathVariable Long userId) {
        userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));
        return financialsRepository.findByUserId(userId);
    }

    // Get financial records for the logged-in employee (Employee view-only)
    @GetMapping("/employee/financials")
    public List<Financials> getEmployeeFinancials(@RequestParam Long userId) {
        userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));
        return financialsRepository.findByUserId(userId);
    }
}
