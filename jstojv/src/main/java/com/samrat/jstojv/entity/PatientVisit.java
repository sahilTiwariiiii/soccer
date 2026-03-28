package com.samrat.jstojv.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "patient_visits")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PatientVisit extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    private PatientRegistration patient;

    private String uhid;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hospital_id", nullable = false)
    private Hospital hospital;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_id", nullable = false)
    private Branch branch;

    @Column(name = "visit_date", nullable = false)
    private LocalDate visitDate;

    @Column(name = "visit_time", nullable = false)
    private LocalTime visitTime;

    @Enumerated(EnumType.STRING)
    @Column(name = "visit_type", nullable = false)
    private VisitType visitType;

    @Enumerated(EnumType.STRING)
    private VisitStatus status = VisitStatus.Arrived;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id", nullable = false)
    private Department department;

    @Column(name = "department_name")
    private String departmentName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id")
    private User doctor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    private Room room;

    @Enumerated(EnumType.STRING)
    private Slot slot;

    private Double fee;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_mode")
    private PaymentMode paymentMode;

    @Column(name = "receipt_no", nullable = false)
    private String receiptNo;

    private String remark;

    public enum VisitType {
        OPD, IPD, Emergency
    }

    public enum VisitStatus {
        Arrived, Waiting, InProgress, Completed
    }

    public enum Slot {
        Slot_I, Slot_II, Slot_III
    }

    public enum PaymentMode {
        Cash, Card, UPI, Insurance
    }
}
