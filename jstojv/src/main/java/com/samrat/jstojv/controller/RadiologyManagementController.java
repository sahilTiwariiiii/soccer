package com.samrat.jstojv.controller;

import com.samrat.jstojv.entity.*;
import com.samrat.jstojv.service.RadiologyManagementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/radiology")
@RequiredArgsConstructor
public class RadiologyManagementController {

    private final RadiologyManagementService radiologyManagementService;
    private final com.samrat.jstojv.repository.UserRepository userRepository;

    // Study Endpoints
    @PostMapping("/studies")
    public ResponseEntity<RadiologyStudy> createStudy(@RequestBody RadiologyStudy study) {
        return new ResponseEntity<>(radiologyManagementService.createStudy(study), HttpStatus.CREATED);
    }

    @GetMapping("/studies")
    public ResponseEntity<List<RadiologyStudy>> getStudiesByStatus(@RequestParam RadiologyStudy.Status status) {
        return ResponseEntity.ok(radiologyManagementService.getStudiesByStatus(status));
    }

    // Image Endpoints
    @PostMapping("/images")
    public ResponseEntity<RadiologyImage> uploadImage(@RequestBody RadiologyImage image) {
        return new ResponseEntity<>(radiologyManagementService.uploadImage(image), HttpStatus.CREATED);
    }

    @GetMapping("/images/{studyId}")
    public ResponseEntity<List<RadiologyImage>> getImagesByStudy(@PathVariable Long studyId) {
        return ResponseEntity.ok(radiologyManagementService.getImagesByStudy(studyId));
    }

    // Report Endpoints
    @PostMapping("/reports")
    public ResponseEntity<RadiologyReport> saveReport(@RequestBody RadiologyReport report) {
        return new ResponseEntity<>(radiologyManagementService.saveReport(report), HttpStatus.CREATED);
    }

    @PostMapping("/reports/{id}/verify")
    public ResponseEntity<RadiologyReport> verifyReport(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        
        User verifier = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(radiologyManagementService.verifyReport(id, verifier));
    }
}
