package com.samrat.jstojv.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "investigation_orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InvestigationOrder extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hospital_id", nullable = false)
    private Hospital hospital;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_id", nullable = false)
    private Branch branch;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    private PatientRegistration patient;

    @Enumerated(EnumType.STRING)
    @Column(name = "encounter_type", nullable = false)
    private EncounterType encounterType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "visit_id")
    private PatientVisit visit;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ipd_admission_id")
    private IPDAdmission ipdAdmission;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "investigation_id", nullable = false)
    private InvestigationMaster investigation;

    @Column(name = "price_at_order_time", nullable = false)
    private Double priceAtOrderTime;

    @Enumerated(EnumType.STRING)
    private Priority priority = Priority.Normal;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private Status status = Status.Pending;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Source source;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by", nullable = false)
    private User createdBy;

    @Column(name = "sample_collected_at")
    private LocalDateTime sampleCollectedAt;

    @Column(name = "completed_at")
    private LocalDateTime completedAt;

    @Column(name = "cancel_reason")
    private String cancelReason;

    private String result;

    @Column(name = "report_file")
    private String reportFile;

    public enum EncounterType {
        OPD, IPD
    }

    public enum Priority {
        Normal, Urgent
    }

    public enum Status {
        Pending, Ordered, Sample_Collected, InProgress, In_Progress, Completed, Cancelled
    }

    public enum Source {
        Digital, Paper_Entered
    }
}
