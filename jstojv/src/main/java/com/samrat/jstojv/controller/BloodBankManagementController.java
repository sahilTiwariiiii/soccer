package com.samrat.jstojv.controller;

import com.samrat.jstojv.entity.*;
import com.samrat.jstojv.service.BloodBankManagementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/blood-bank")
@RequiredArgsConstructor
public class BloodBankManagementController {

    private final BloodBankManagementService bloodBankManagementService;

    // Donor Endpoints
    @PostMapping("/donors")
    public ResponseEntity<BloodDonor> registerDonor(@RequestBody BloodDonor donor) {
        return new ResponseEntity<>(bloodBankManagementService.registerDonor(donor), HttpStatus.CREATED);
    }

    @GetMapping("/donors")
    public ResponseEntity<List<BloodDonor>> getAllDonors() {
        return ResponseEntity.ok(bloodBankManagementService.getAllDonors());
    }

    // Donation Endpoints
    @PostMapping("/donations")
    public ResponseEntity<BloodDonation> logDonation(@RequestBody BloodDonation donation) {
        return new ResponseEntity<>(bloodBankManagementService.logDonation(donation), HttpStatus.CREATED);
    }

    // Inventory Endpoints
    @GetMapping("/inventory/available")
    public ResponseEntity<List<BloodInventory>> getAvailableBloodUnits() {
        return ResponseEntity.ok(bloodBankManagementService.getAvailableBloodUnits());
    }

    // Request and Issue Endpoints
    @PostMapping("/requests")
    public ResponseEntity<BloodRequest> createBloodRequest(@RequestBody BloodRequest request) {
        return new ResponseEntity<>(bloodBankManagementService.createBloodRequest(request), HttpStatus.CREATED);
    }

    @PostMapping("/issues")
    public ResponseEntity<BloodIssue> issueBlood(@RequestBody BloodIssue issue) {
        return new ResponseEntity<>(bloodBankManagementService.issueBlood(issue), HttpStatus.CREATED);
    }
}
