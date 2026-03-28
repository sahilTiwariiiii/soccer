package com.samrat.jstojv.controller;

import com.samrat.jstojv.entity.*;
import com.samrat.jstojv.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/v1/patients/tracking")
@RequiredArgsConstructor
public class PatientTrackingController {

    private final PatientVisitRepository patientVisitRepository;
    private final IPDAdmissionRepository ipdAdmissionRepository;
    private final UserRepository userRepository;

    @GetMapping("/opd")
    public ResponseEntity<List<PatientVisit>> getOPDPatients(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime fromDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime toDate,
            @AuthenticationPrincipal UserDetails userDetails) {
        
        User currentUser = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        // Basic filtering logic (can be expanded with Specifications)
        List<PatientVisit> visits = patientVisitRepository.findByBranchId(currentUser.getBranch().getId());
        // In a real app, use Spring Data JPA Specifications for complex filtering
        return ResponseEntity.ok(visits);
    }

    @GetMapping("/ipd")
    public ResponseEntity<List<IPDAdmission>> getIPDPatients(
            @RequestParam(required = false) String status,
            @AuthenticationPrincipal UserDetails userDetails) {
        
        User currentUser = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        IPDAdmission.Status admissionStatus = status != null ? IPDAdmission.Status.valueOf(status) : IPDAdmission.Status.ADMITTED;
        List<IPDAdmission> admissions = ipdAdmissionRepository.findByStatus(admissionStatus);
        return ResponseEntity.ok(admissions);
    }
}
