package com.samrat.jstojv.controller;

import com.samrat.jstojv.entity.*;
import com.samrat.jstojv.service.AmbulanceManagementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/ambulance-management")
@RequiredArgsConstructor
public class AmbulanceManagementController {

    private final AmbulanceManagementService ambulanceManagementService;

    // Ambulance Endpoints
    @PostMapping("/ambulances")
    public ResponseEntity<AmbulanceMaster> createAmbulance(@RequestBody AmbulanceMaster ambulance) {
        return new ResponseEntity<>(ambulanceManagementService.createAmbulance(ambulance), HttpStatus.CREATED);
    }

    @GetMapping("/ambulances")
    public ResponseEntity<List<AmbulanceMaster>> getAllAmbulances() {
        return ResponseEntity.ok(ambulanceManagementService.getAllAmbulances());
    }

    @GetMapping("/ambulances/{id}")
    public ResponseEntity<AmbulanceMaster> getAmbulanceById(@PathVariable Long id) {
        return ambulanceManagementService.getAmbulanceById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/ambulances/{id}")
    public ResponseEntity<AmbulanceMaster> updateAmbulance(@PathVariable Long id, @RequestBody AmbulanceMaster ambulance) {
        return ResponseEntity.ok(ambulanceManagementService.updateAmbulance(id, ambulance));
    }

    @DeleteMapping("/ambulances/{id}")
    public ResponseEntity<Void> deleteAmbulance(@PathVariable Long id) {
        ambulanceManagementService.deleteAmbulance(id);
        return ResponseEntity.noContent().build();
    }

    // Trip Endpoints
    @PostMapping("/trips")
    public ResponseEntity<AmbulanceTrip> logTrip(@RequestBody AmbulanceTrip trip) {
        return new ResponseEntity<>(ambulanceManagementService.logTrip(trip), HttpStatus.CREATED);
    }

    @GetMapping("/trips/history/{ambulanceId}")
    public ResponseEntity<List<AmbulanceTrip>> getTripHistory(@PathVariable Long ambulanceId) {
        return ResponseEntity.ok(ambulanceManagementService.getTripHistory(ambulanceId));
    }

    // Maintenance Endpoints
    @PostMapping("/maintenance")
    public ResponseEntity<AmbulanceMaintenance> logMaintenance(@RequestBody AmbulanceMaintenance maintenance) {
        return new ResponseEntity<>(ambulanceManagementService.logMaintenance(maintenance), HttpStatus.CREATED);
    }

    // Assignment Endpoints
    @PostMapping("/assignments")
    public ResponseEntity<AmbulanceAssignment> assignStaff(@RequestBody AmbulanceAssignment assignment) {
        return new ResponseEntity<>(ambulanceManagementService.assignStaff(assignment), HttpStatus.CREATED);
    }
}
