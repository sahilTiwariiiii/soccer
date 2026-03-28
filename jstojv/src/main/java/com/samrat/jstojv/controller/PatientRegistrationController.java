package com.samrat.jstojv.controller;

import com.samrat.jstojv.entity.PatientRegistration;
import com.samrat.jstojv.entity.PatientVisit;
import com.samrat.jstojv.service.PatientRegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/patients")
public class PatientRegistrationController {

    @Autowired
    private PatientRegistrationService patientRegistrationService;

    @GetMapping
    public ResponseEntity<?> getPatients(
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "20") int limit) {
        Page<PatientRegistration> patients = patientRegistrationService.getPatients(search, page, limit);
        return ResponseEntity.ok(Map.of("data", patients.getContent(), "total", patients.getTotalElements()));
    }

    @GetMapping("/find")
    public ResponseEntity<?> findPatient(
            @RequestParam(required = false) String uhid,
            @RequestParam(required = false) String mobile) {
        if (uhid == null && mobile == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", "UHID or Mobile is required"));
        }
        Optional<PatientRegistration> patient = patientRegistrationService.findPatient(uhid, mobile);
        if (patient.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Patient not found"));
        }
        return ResponseEntity.ok(patient.get());
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerPatient(@RequestBody PatientRegistration patient) {
        try {
            PatientRegistration newPatient = patientRegistrationService.registerPatient(patient);
            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("message", "Patient registered successfully", "patient", newPatient));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("message", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/visits")
    public ResponseEntity<List<PatientVisit>> listVisits() {
        return ResponseEntity.ok(patientRegistrationService.listVisits());
    }
}
