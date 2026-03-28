package com.samrat.jstojv.controller;

import com.samrat.jstojv.entity.*;
import com.samrat.jstojv.service.CoreManagementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/core")
@RequiredArgsConstructor
public class CoreManagementController {

    private final CoreManagementService coreManagementService;

    // Patient Registration Endpoints
    @PostMapping("/patients")
    public ResponseEntity<PatientRegistration> registerPatient(@RequestBody PatientRegistration patient) {
        return new ResponseEntity<>(coreManagementService.registerPatient(patient), HttpStatus.CREATED);
    }

    @GetMapping("/patients")
    public ResponseEntity<List<PatientRegistration>> getAllPatients() {
        return ResponseEntity.ok(coreManagementService.getAllPatients());
    }

    @GetMapping("/patients/{id}")
    public ResponseEntity<PatientRegistration> getPatientById(@PathVariable Long id) {
        return coreManagementService.getPatientById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Department Endpoints
    @PostMapping("/departments")
    public ResponseEntity<Department> createDepartment(@RequestBody Department department) {
        return new ResponseEntity<>(coreManagementService.createDepartment(department), HttpStatus.CREATED);
    }

    @GetMapping("/departments")
    public ResponseEntity<List<Department>> getAllDepartments() {
        return ResponseEntity.ok(coreManagementService.getAllDepartments());
    }

    // Procedure Order Endpoints
    @PostMapping("/procedures")
    public ResponseEntity<ProcedureOrder> createProcedureOrder(@RequestBody ProcedureOrder order) {
        return new ResponseEntity<>(coreManagementService.createProcedureOrder(order), HttpStatus.CREATED);
    }

    @GetMapping("/procedures/patient/{patientId}")
    public ResponseEntity<List<ProcedureOrder>> getPatientProcedures(@PathVariable Long patientId) {
        return ResponseEntity.ok(coreManagementService.getPatientProcedures(patientId));
    }
}
