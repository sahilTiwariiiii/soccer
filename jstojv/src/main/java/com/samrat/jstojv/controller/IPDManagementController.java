package com.samrat.jstojv.controller;

import com.samrat.jstojv.entity.*;
import com.samrat.jstojv.service.IPDManagementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/ipd")
@RequiredArgsConstructor
public class IPDManagementController {

    private final IPDManagementService ipdManagementService;

    @PostMapping("/admissions")
    public ResponseEntity<IPDAdmission> createIPDAdmission(@RequestBody IPDAdmission admission) {
        return new ResponseEntity<>(ipdManagementService.createIPDAdmission(admission), HttpStatus.CREATED);
    }

    @GetMapping("/admissions")
    public ResponseEntity<List<IPDAdmission>> getAllAdmissions() {
        return ResponseEntity.ok(ipdManagementService.getAllAdmissions());
    }

    @PostMapping("/daily-notes")
    public ResponseEntity<IPDDailyNote> addDailyNote(@RequestBody IPDDailyNote note) {
        return new ResponseEntity<>(ipdManagementService.addDailyNote(note), HttpStatus.CREATED);
    }

    @PostMapping("/nursing-notes")
    public ResponseEntity<IPDNursingNote> addNursingNote(@RequestBody IPDNursingNote note) {
        return new ResponseEntity<>(ipdManagementService.addNursingNote(note), HttpStatus.CREATED);
    }

    @PostMapping("/doctor-assignments")
    public ResponseEntity<IPDDoctorAssignment> assignDoctor(@RequestBody IPDDoctorAssignment assignment) {
        return new ResponseEntity<>(ipdManagementService.assignDoctor(assignment), HttpStatus.CREATED);
    }

    @PostMapping("/admissions/{id}/discharge")
    public ResponseEntity<IPDAdmission> dischargePatient(@PathVariable Long id, @RequestBody String summary) {
        return ResponseEntity.ok(ipdManagementService.dischargePatient(id, summary));
    }
}
