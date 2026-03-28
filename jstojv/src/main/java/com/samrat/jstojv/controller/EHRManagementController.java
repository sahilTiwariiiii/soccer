package com.samrat.jstojv.controller;

import com.samrat.jstojv.entity.*;
import com.samrat.jstojv.service.EHRManagementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/ehr")
@RequiredArgsConstructor
public class EHRManagementController {

    private final EHRManagementService ehrManagementService;

    // History Endpoints
    @PostMapping("/history")
    public ResponseEntity<PatientHistory> addHistoryEntry(@RequestBody PatientHistory history) {
        return new ResponseEntity<>(ehrManagementService.addHistoryEntry(history), HttpStatus.CREATED);
    }

    @GetMapping("/history/{patientId}")
    public ResponseEntity<List<PatientHistory>> getPatientHistory(@PathVariable Long patientId) {
        return ResponseEntity.ok(ehrManagementService.getPatientHistory(patientId));
    }

    // Prescription Endpoints
    @PostMapping("/prescriptions")
    public ResponseEntity<Prescription> createPrescription(@RequestBody Prescription prescription) {
        return new ResponseEntity<>(ehrManagementService.createPrescription(prescription), HttpStatus.CREATED);
    }

    @GetMapping("/prescriptions/{patientId}")
    public ResponseEntity<List<Prescription>> getPatientPrescriptions(@PathVariable Long patientId) {
        return ResponseEntity.ok(ehrManagementService.getPatientPrescriptions(patientId));
    }
}
