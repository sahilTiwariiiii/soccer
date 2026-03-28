package com.samrat.jstojv.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "procedure_orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProcedureOrder extends BaseEntity {

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

    @Enumerated(EnumType.STRING)
    @Column(name = "procedure_type", nullable = false)
    private ProcedureType procedureType;

    @Column(name = "procedure_name", nullable = false)
    private String procedureName;

    @Enumerated(EnumType.STRING)
    private Priority priority = Priority.Normal;

    @Enumerated(EnumType.STRING)
    private Status status = Status.Pending;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "performed_by")
    private User performedBy;

    private String notes;

    @Column(name = "performed_at")
    private LocalDateTime performedAt;

    public enum EncounterType {
        OPD, IPD, DAYCARE
    }

    public enum ProcedureType {
        Dressing, Suturing, Nebulization, Catheterization, Biopsy, Endoscopy, Minor_Surgery, Major_Surgery, Dialysis, Physiotherapy, Vaccination, Other
    }

    public enum Priority {
        Normal, Urgent
    }

    public enum Status {
        Pending, Ordered, InProgress, In_Progress, Completed, Cancelled
    }
}
