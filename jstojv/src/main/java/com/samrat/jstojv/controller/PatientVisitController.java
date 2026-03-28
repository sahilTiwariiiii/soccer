package com.samrat.jstojv.controller;

import com.samrat.jstojv.dto.PatientVisitRequest;
import com.samrat.jstojv.dto.PatientVisitResponse;
import com.samrat.jstojv.entity.User;
import com.samrat.jstojv.repository.UserRepository;
import com.samrat.jstojv.service.PatientVisitService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/patient-visits")
@RequiredArgsConstructor
public class PatientVisitController {

    private final PatientVisitService patientVisitService;
    private final UserRepository userRepository;

    @PostMapping
    public ResponseEntity<PatientVisitResponse> createPatientVisit(
            @RequestBody PatientVisitRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        
        User currentUser = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        PatientVisitResponse response = patientVisitService.createPatientVisit(request, currentUser);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
}
