package com.samrat.jstojv.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "insurance_claims")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InsuranceClaim extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hospital_id", nullable = false)
    private Hospital hospital;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_id", nullable = false)
    private Branch branch;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "invoice_id", nullable = false)
    private PharmacyInvoice invoice;

    @Column(name = "insurance_company")
    private String insuranceCompany;

    @Column(name = "claim_amount")
    private Double claimAmount;

    @Enumerated(EnumType.STRING)
    @Column(name = "claim_status")
    private Status claimStatus = Status.Submitted;

    public enum Status {
        Submitted, Approved, Rejected, Settled
    }
}
