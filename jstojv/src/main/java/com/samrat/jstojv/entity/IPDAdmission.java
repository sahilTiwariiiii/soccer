package com.samrat.jstojv.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "ipd_admissions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class IPDAdmission extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hospital_id", nullable = false)
    private Hospital hospital;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_id", nullable = false)
    private Branch branch;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    private PatientRegistration patient;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "visit_id", nullable = false)
    private PatientVisit visit;

    @Column(name = "admission_number", nullable = false)
    private String admissionNumber;

    @Column(name = "admission_date")
    private LocalDateTime admissionDate = LocalDateTime.now();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bed_id")
    private Bed bed;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "ipd_admission_doctors",
        joinColumns = @JoinColumn(name = "ipd_admission_id"),
        inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<User> treatingDoctors;

    @Enumerated(EnumType.STRING)
    private Status status = Status.ADMITTED;

    @Column(name = "discharge_date")
    private LocalDateTime dischargeDate;

    @Column(name = "discharge_summary")
    private String dischargeSummary;

    public enum Status {
        ADMITTED, DISCHARGED
    }
}
