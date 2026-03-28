package com.samrat.jstojv.controller;

import com.samrat.jstojv.entity.*;
import com.samrat.jstojv.service.CertificateManagementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/certificates")
@RequiredArgsConstructor
public class CertificateManagementController {

    private final CertificateManagementService certificateManagementService;

    // Template Endpoints
    @PostMapping("/templates")
    public ResponseEntity<CertificateTemplate> createTemplate(@RequestBody CertificateTemplate template) {
        return new ResponseEntity<>(certificateManagementService.createTemplate(template), HttpStatus.CREATED);
    }

    @GetMapping("/templates")
    public ResponseEntity<List<CertificateTemplate>> getAllTemplates() {
        return ResponseEntity.ok(certificateManagementService.getAllTemplates());
    }

    // Type Endpoints
    @PostMapping("/types")
    public ResponseEntity<CertificateType> createType(@RequestBody CertificateType type) {
        return new ResponseEntity<>(certificateManagementService.createType(type), HttpStatus.CREATED);
    }

    @GetMapping("/types")
    public ResponseEntity<List<CertificateType>> getAllTypes() {
        return ResponseEntity.ok(certificateManagementService.getAllTypes());
    }

    // Generation Endpoints
    @PostMapping("/generate")
    public ResponseEntity<GeneratedCertificate> generateCertificate(@RequestBody GeneratedCertificate certificate) {
        return new ResponseEntity<>(certificateManagementService.generateCertificate(certificate), HttpStatus.CREATED);
    }

    @GetMapping("/verify/{certificateNumber}")
    public ResponseEntity<GeneratedCertificate> verifyCertificate(@PathVariable String certificateNumber) {
        return certificateManagementService.verifyCertificate(certificateNumber)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
