package com.samrat.jstojv.service;

import com.samrat.jstojv.entity.*;
import com.samrat.jstojv.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BillingManagementService {

    private final InvoiceRepository invoiceRepository;
    private final ReceiptRepository receiptRepository;

    @Transactional
    public Invoice createInvoice(Invoice invoice) {
        if (invoice.getInvoiceNumber() == null) {
            invoice.setInvoiceNumber("INV-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        }
        return invoiceRepository.save(invoice);
    }

    public List<Invoice> getPatientInvoices(Long patientId) {
        return invoiceRepository.findByPatientId(patientId);
    }

    @Transactional
    public Invoice updatePaymentStatus(Long id, Invoice.PaymentStatus status) {
        Invoice invoice = invoiceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Invoice not found"));
        invoice.setPaymentStatus(status);
        return invoiceRepository.save(invoice);
    }

    public List<Receipt> getPatientReceipts(Long patientId) {
        return receiptRepository.findByPatientId(patientId);
    }
}
