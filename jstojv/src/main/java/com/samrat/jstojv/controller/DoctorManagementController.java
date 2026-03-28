package com.samrat.jstojv.controller;

import com.samrat.jstojv.entity.*;
import com.samrat.jstojv.service.DoctorManagementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/doctor-management")
@RequiredArgsConstructor
public class DoctorManagementController {

    private final DoctorManagementService doctorManagementService;

    // Financials
    @PostMapping("/financials")
    public ResponseEntity<DoctorFinancial> createDoctorFinancial(@RequestBody DoctorFinancial doctorFinancial) {
        return new ResponseEntity<>(doctorManagementService.createDoctorFinancial(doctorFinancial), HttpStatus.CREATED);
    }

    @GetMapping("/financials")
    public ResponseEntity<List<DoctorFinancial>> getAllDoctorFinancials() {
        return ResponseEntity.ok(doctorManagementService.getAllDoctorFinancials());
    }

    @GetMapping("/financials/{id}")
    public ResponseEntity<DoctorFinancial> getDoctorFinancialById(@PathVariable Long id) {
        return doctorManagementService.getDoctorFinancialById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/financials/{id}")
    public ResponseEntity<DoctorFinancial> updateDoctorFinancial(@PathVariable Long id, @RequestBody DoctorFinancial doctorFinancial) {
        return ResponseEntity.ok(doctorManagementService.updateDoctorFinancial(id, doctorFinancial));
    }

    @DeleteMapping("/financials/{id}")
    public ResponseEntity<Void> deleteDoctorFinancial(@PathVariable Long id) {
        doctorManagementService.deleteDoctorFinancial(id);
        return ResponseEntity.noContent().build();
    }

    // Operational, Document, ServiceMapping can be added similarly
    @PostMapping("/operationals")
    public ResponseEntity<DoctorOperational> createDoctorOperational(@RequestBody DoctorOperational doctorOperational) {
        return new ResponseEntity<>(doctorManagementService.createDoctorOperational(doctorOperational), HttpStatus.CREATED);
    }

    @PostMapping("/documents")
    public ResponseEntity<DoctorDocument> createDoctorDocument(@RequestBody DoctorDocument doctorDocument) {
        return new ResponseEntity<>(doctorManagementService.createDoctorDocument(doctorDocument), HttpStatus.CREATED);
    }

    @PostMapping("/service-mappings")
    public ResponseEntity<DoctorServiceMapping> createDoctorServiceMapping(@RequestBody DoctorServiceMapping mapping) {
        return new ResponseEntity<>(doctorManagementService.createDoctorServiceMapping(mapping), HttpStatus.CREATED);
    }
}
