package com.samrat.jstojv.controller;

import com.samrat.jstojv.entity.*;
import com.samrat.jstojv.service.BedWardManagementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/bed-management")
@RequiredArgsConstructor
public class BedWardManagementController {

    private final BedWardManagementService bedWardManagementService;

    // Ward Endpoints
    @PostMapping("/wards")
    public ResponseEntity<Ward> createWard(@RequestBody Ward ward) {
        return new ResponseEntity<>(bedWardManagementService.createWard(ward), HttpStatus.CREATED);
    }

    @GetMapping("/wards")
    public ResponseEntity<List<Ward>> getAllWards() {
        return ResponseEntity.ok(bedWardManagementService.getAllWards());
    }

    // Bed Endpoints
    @PostMapping("/beds")
    public ResponseEntity<Bed> createBed(@RequestBody Bed bed) {
        return new ResponseEntity<>(bedWardManagementService.createBed(bed), HttpStatus.CREATED);
    }

    @GetMapping("/beds/room/{roomId}")
    public ResponseEntity<List<Bed>> getBedsByRoom(@PathVariable Long roomId) {
        return ResponseEntity.ok(bedWardManagementService.getBedsByRoom(roomId));
    }

    @GetMapping("/beds/available")
    public ResponseEntity<List<Bed>> getAvailableBeds(@RequestParam Long branchId) {
        return ResponseEntity.ok(bedWardManagementService.getAvailableBeds(branchId));
    }

    @PatchMapping("/beds/{id}/status")
    public ResponseEntity<Bed> updateBedStatus(@PathVariable Long id, @RequestParam Bed.BedStatus status) {
        return ResponseEntity.ok(bedWardManagementService.updateBedStatus(id, status));
    }
}
