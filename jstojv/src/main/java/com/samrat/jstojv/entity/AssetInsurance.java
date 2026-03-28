package com.samrat.jstojv.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "asset_insurances")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AssetInsurance extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hospital_id", nullable = false)
    private Hospital hospital;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_id", nullable = false)
    private Branch branch;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "asset_id")
    private AssetMaster asset;

    @Column(name = "policy_number")
    private String policyNumber;

    @Column(name = "insurance_company")
    private String insuranceCompany;

    @Column(name = "coverage_amount")
    private Double coverageAmount;

    @Column(name = "start_date")
    private LocalDateTime startDate;

    @Column(name = "expiry_date")
    private LocalDateTime expiryDate;
}
