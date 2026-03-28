package com.samrat.jstojv.controller;

import com.samrat.jstojv.entity.*;
import com.samrat.jstojv.service.BillingManagementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/billing")
@RequiredArgsConstructor
public class BillingManagementController {

    private final BillingManagementService billingManagementService;

    @PostMapping("/invoices")
    public ResponseEntity<Invoice> createInvoice(@RequestBody Invoice invoice) {
        return new ResponseEntity<>(billingManagementService.createInvoice(invoice), HttpStatus.CREATED);
    }

    @GetMapping("/invoices/patient/{patientId}")
    public ResponseEntity<List<Invoice>> getPatientInvoices(@PathVariable Long patientId) {
        return ResponseEntity.ok(billingManagementService.getPatientInvoices(patientId));
    }

    @PatchMapping("/invoices/{id}/payment-status")
    public ResponseEntity<Invoice> updatePaymentStatus(@PathVariable Long id, @RequestParam Invoice.PaymentStatus status) {
        return ResponseEntity.ok(billingManagementService.updatePaymentStatus(id, status));
    }

    @GetMapping("/receipts/patient/{patientId}")
    public ResponseEntity<List<Receipt>> getPatientReceipts(@PathVariable Long patientId) {
        return ResponseEntity.ok(billingManagementService.getPatientReceipts(patientId));
    }
}
