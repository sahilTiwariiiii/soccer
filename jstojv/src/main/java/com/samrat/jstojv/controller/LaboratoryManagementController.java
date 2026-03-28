package com.samrat.jstojv.controller;

import com.samrat.jstojv.entity.*;
import com.samrat.jstojv.repository.InvestigationOrderRepository;
import com.samrat.jstojv.service.LaboratoryManagementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/lab")
@RequiredArgsConstructor
public class LaboratoryManagementController {

    private final LaboratoryManagementService laboratoryManagementService;
    private final InvestigationOrderRepository investigationOrderRepository;
    private final com.samrat.jstojv.repository.UserRepository userRepository;

    // Investigation Endpoints
    @PostMapping("/investigations")
    public ResponseEntity<InvestigationMaster> createInvestigation(@RequestBody InvestigationMaster investigation) {
        return new ResponseEntity<>(laboratoryManagementService.createInvestigation(investigation), HttpStatus.CREATED);
    }

    @GetMapping("/investigations")
    public ResponseEntity<List<InvestigationMaster>> getAllInvestigations() {
        return ResponseEntity.ok(laboratoryManagementService.getAllInvestigations());
    }

    // Order Endpoints
    @PostMapping("/orders")
    public ResponseEntity<InvestigationOrder> createOrder(@RequestBody InvestigationOrder order) {
        return new ResponseEntity<>(laboratoryManagementService.createOrder(order), HttpStatus.CREATED);
    }

    @GetMapping("/orders")
    public ResponseEntity<List<InvestigationOrder>> getAllInvestigationOrders() {
        return ResponseEntity.ok(investigationOrderRepository.findAll());
    }

    @GetMapping("/orders/{id}")
    public ResponseEntity<InvestigationOrder> getInvestigationOrderById(@PathVariable Long id) {
        return investigationOrderRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/orders/visit/{visitId}")
    public ResponseEntity<List<InvestigationOrder>> getOrdersByVisit(@PathVariable Long visitId) {
        return ResponseEntity.ok(investigationOrderRepository.findByVisitId(visitId));
    }

    @PatchMapping("/orders/{id}/status")
    public ResponseEntity<InvestigationOrder> updateOrderStatus(@PathVariable Long id, @RequestParam InvestigationOrder.Status status) {
        InvestigationOrder order = investigationOrderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setStatus(status);
        return ResponseEntity.ok(investigationOrderRepository.save(order));
    }

    @DeleteMapping("/orders/{id}")
    public ResponseEntity<Void> deleteInvestigationOrder(@PathVariable Long id) {
        investigationOrderRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // Sample Endpoints
    @PostMapping("/samples/collect")
    public ResponseEntity<LabSample> collectSample(@RequestBody LabSample sample) {
        return new ResponseEntity<>(laboratoryManagementService.collectSample(sample), HttpStatus.CREATED);
    }

    // Result Endpoints
    @PostMapping("/results")
    public ResponseEntity<LabResult> entryResult(@RequestBody LabResult result) {
        return new ResponseEntity<>(laboratoryManagementService.entryResult(result), HttpStatus.CREATED);
    }

    @PostMapping("/results/{id}/verify")
    public ResponseEntity<LabResult> verifyResult(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        
        User verifier = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(laboratoryManagementService.verifyResult(id, verifier));
    }
}
