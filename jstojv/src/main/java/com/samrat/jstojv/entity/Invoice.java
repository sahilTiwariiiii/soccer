package com.samrat.jstojv.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "invoices")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Invoice extends BaseEntity {

    @Column(nullable = false, unique = true)
    private String invoiceNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    private PatientRegistration patient;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "visit_id")
    private PatientVisit visit;

    @ElementCollection
    @CollectionTable(name = "invoice_items", joinColumns = @JoinColumn(name = "invoice_id"))
    private List<InvoiceItem> items;

    @Column(nullable = false)
    private Double total;

    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus = PaymentStatus.unpaid;

    @Embeddable
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class InvoiceItem {
        @Column(nullable = false)
        private String description;
        @Column(nullable = false)
        private Integer quantity;
        @Column(nullable = false)
        private Double price;
    }

    public enum PaymentStatus {
        paid, unpaid
    }
}
