package com.samrat.jstojv.controller;

import com.samrat.jstojv.entity.*;
import com.samrat.jstojv.service.ClinicalDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/clinical-details")
@RequiredArgsConstructor
public class ClinicalDetailsController {

    private final ClinicalDetailsService clinicalDetailsService;

    // Addiction Endpoints
    @PostMapping("/addictions")
    public ResponseEntity<Addiction> createAddiction(@RequestBody Addiction addiction) {
        return new ResponseEntity<>(clinicalDetailsService.createAddiction(addiction), HttpStatus.CREATED);
    }

    @GetMapping("/addictions/patient/{patientId}")
    public ResponseEntity<List<Addiction>> getPatientAddictions(@PathVariable Long patientId) {
        return ResponseEntity.ok(clinicalDetailsService.getPatientAddictions(patientId));
    }

    @DeleteMapping("/addictions/{id}")
    public ResponseEntity<Void> deleteAddiction(@PathVariable Long id) {
        clinicalDetailsService.deleteAddiction(id);
        return ResponseEntity.noContent().build();
    }

    // Diagnosis Endpoints
    @PostMapping("/diagnosis")
    public ResponseEntity<Diagnosis> createDiagnosis(@RequestBody Diagnosis diagnosis) {
        return new ResponseEntity<>(clinicalDetailsService.createDiagnosis(diagnosis), HttpStatus.CREATED);
    }

    @GetMapping("/diagnosis/patient/{patientId}")
    public ResponseEntity<List<Diagnosis>> getDiagnosisByPatient(@PathVariable Long patientId) {
        return ResponseEntity.ok(clinicalDetailsService.getDiagnosisByPatient(patientId));
    }

    @GetMapping("/diagnosis/visit/{visitId}")
    public ResponseEntity<List<Diagnosis>> getDiagnosisByVisit(@PathVariable Long visitId) {
        return ResponseEntity.ok(clinicalDetailsService.getDiagnosisByVisit(visitId));
    }

    // Doctor Notes Endpoints
    @PostMapping("/doctor-notes")
    public ResponseEntity<DoctorNotes> createDoctorNote(@RequestBody DoctorNotes note) {
        return new ResponseEntity<>(clinicalDetailsService.createDoctorNote(note), HttpStatus.CREATED);
    }

    @GetMapping("/doctor-notes/visit/{visitId}")
    public ResponseEntity<List<DoctorNotes>> getDoctorNotesByVisit(@PathVariable Long visitId) {
        return ResponseEntity.ok(clinicalDetailsService.getDoctorNotesByVisit(visitId));
    }

    // History Endpoints
    @PostMapping("/medical-history")
    public ResponseEntity<PastMedicalHistory> createMedicalHistory(@RequestBody PastMedicalHistory history) {
        return new ResponseEntity<>(clinicalDetailsService.createMedicalHistory(history), HttpStatus.CREATED);
    }

    @GetMapping("/medical-history/patient/{patientId}")
    public ResponseEntity<List<PastMedicalHistory>> getMedicalHistory(@PathVariable Long patientId) {
        return ResponseEntity.ok(clinicalDetailsService.getMedicalHistory(patientId));
    }

    @PostMapping("/surgical-history")
    public ResponseEntity<PastSurgicalHistory> createSurgicalHistory(@RequestBody PastSurgicalHistory history) {
        return new ResponseEntity<>(clinicalDetailsService.createSurgicalHistory(history), HttpStatus.CREATED);
    }

    @GetMapping("/surgical-history/patient/{patientId}")
    public ResponseEntity<List<PastSurgicalHistory>> getSurgicalHistory(@PathVariable Long patientId) {
        return ResponseEntity.ok(clinicalDetailsService.getSurgicalHistory(patientId));
    }

    @PostMapping("/personal-history")
    public ResponseEntity<PersonalHistory> createPersonalHistory(@RequestBody PersonalHistory history) {
        return new ResponseEntity<>(clinicalDetailsService.createPersonalHistory(history), HttpStatus.CREATED);
    }

    @GetMapping("/personal-history/patient/{patientId}")
    public ResponseEntity<List<PersonalHistory>> getPersonalHistory(@PathVariable Long patientId) {
        return ResponseEntity.ok(clinicalDetailsService.getPersonalHistory(patientId));
    }

    // Treatment Endpoints
    @PostMapping("/current-treatment")
    public ResponseEntity<CurrentTreatment> createCurrentTreatment(@RequestBody CurrentTreatment treatment) {
        return new ResponseEntity<>(clinicalDetailsService.createCurrentTreatment(treatment), HttpStatus.CREATED);
    }

    @GetMapping("/current-treatment/visit/{visitId}")
    public ResponseEntity<List<CurrentTreatment>> getCurrentTreatment(@PathVariable Long visitId) {
        return ResponseEntity.ok(clinicalDetailsService.getCurrentTreatment(visitId));
    }
}
