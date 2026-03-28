package com.samrat.jstojv.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "doctor_financials")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DoctorFinancial extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hospital_id", nullable = false)
    private Hospital hospital;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id", nullable = false)
    private User doctor;

    @ElementCollection
    @CollectionTable(name = "doctor_consultation_fees", joinColumns = @JoinColumn(name = "doctor_financial_id"))
    private List<ConsultationFee> consultationFees;

    @Embedded
    private Commission commission;

    @Embeddable
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ConsultationFee {
        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "branch_id", nullable = false)
        private Branch branch;

        @Column(name = "opd_fee")
        private Double opdFee;
        @Column(name = "ipd_visit_fee")
        private Double ipdVisitFee;
        @Column(name = "emergency_fee")
        private Double emergencyFee;
    }

    @Embeddable
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Commission {
        @Enumerated(EnumType.STRING)
        private CommissionType type;
        private Double value;
    }

    public enum CommissionType {
        Percentage, Fixed
    }
}
