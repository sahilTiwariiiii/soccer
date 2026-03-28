package com.samrat.jstojv.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "pharmacy_invoices")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PharmacyInvoice extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hospital_id", nullable = false)
    private Hospital hospital;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_id", nullable = false)
    private Branch branch;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "prescription_id")
    private Prescription prescription;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    private PatientRegistration patient;

    @Column(name = "invoice_number")
    private String invoiceNumber;

    @Column(name = "invoice_html", columnDefinition = "TEXT")
    private String invoiceHtml;

    @Column(name = "total_amount")
    private Double totalAmount;

    private Double discount;

    @Column(name = "tax_amount")
    private Double taxAmount;

    @Column(name = "net_amount")
    private Double netAmount;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_status")
    private PaymentStatus paymentStatus = PaymentStatus.Unpaid;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by")
    private User createdBy;

    public enum PaymentStatus {
        Unpaid, PartiallyPaid, Paid
    }
}
