package com.samrat.jstojv.controller;

import com.samrat.jstojv.entity.*;
import com.samrat.jstojv.service.VitalsManagementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/vitals")
@RequiredArgsConstructor
public class VitalsManagementController {

    private final VitalsManagementService vitalsManagementService;

    // Vital Definition Endpoints
    @PostMapping("/global")
    public ResponseEntity<GlobalVital> createGlobalVital(@RequestBody GlobalVital vital) {
        return new ResponseEntity<>(vitalsManagementService.createGlobalVital(vital), HttpStatus.CREATED);
    }

    @GetMapping("/global")
    public ResponseEntity<List<GlobalVital>> getGlobalVitals() {
        return ResponseEntity.ok(vitalsManagementService.getGlobalVitals());
    }

    @PostMapping("/department-mapping")
    public ResponseEntity<DepartmentVital> mapVitalToDepartment(@RequestBody DepartmentVital departmentVital) {
        return new ResponseEntity<>(vitalsManagementService.mapVitalToDepartment(departmentVital), HttpStatus.CREATED);
    }

    @GetMapping("/department/{departmentId}")
    public ResponseEntity<List<DepartmentVital>> getVitalsByDepartment(@PathVariable Long departmentId) {
        return ResponseEntity.ok(vitalsManagementService.getVitalsByDepartment(departmentId));
    }

    // Visit Vitals Endpoints
    @PostMapping("/record")
    public ResponseEntity<VisitVital> recordVisitVitals(@RequestBody VisitVital visitVital) {
        return new ResponseEntity<>(vitalsManagementService.recordVisitVitals(visitVital), HttpStatus.CREATED);
    }

    @GetMapping("/visit/{visitId}")
    public ResponseEntity<VisitVital> getVitalsByVisit(@PathVariable Long visitId) {
        return vitalsManagementService.getVitalsByVisit(visitId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
