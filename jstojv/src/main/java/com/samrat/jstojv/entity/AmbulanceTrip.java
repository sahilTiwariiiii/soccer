package com.samrat.jstojv.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "ambulance_trips")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AmbulanceTrip extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hospital_id", nullable = false)
    private Hospital hospital;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_id", nullable = false)
    private Branch branch;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ambulance_id", nullable = false)
    private AmbulanceMaster ambulance;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "driver_id", nullable = false)
    private User driver;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    private PatientRegistration patient;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "visit_id", nullable = false)
    private PatientVisit visit;

    @Column(name = "from_location")
    private String fromLocation;

    @Column(name = "to_location")
    private String toLocation;

    @Enumerated(EnumType.STRING)
    @Column(name = "trip_type")
    private TripType tripType = TripType.Routine;

    @Column(name = "requested_at")
    private LocalDateTime requestedAt = LocalDateTime.now();

    @Column(name = "dispatched_at")
    private LocalDateTime dispatchedAt;

    @Column(name = "arrived_at_patient")
    private LocalDateTime arrivedAtPatient;

    @Column(name = "left_patient")
    private LocalDateTime leftPatient;

    @Column(name = "arrived_at_hospital")
    private LocalDateTime arrivedAtHospital;

    @Column(name = "completed_at")
    private LocalDateTime completedAt;

    @Enumerated(EnumType.STRING)
    private Status status = Status.Requested;

    private String remarks;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by")
    private User createdBy;

    public enum TripType {
        Emergency, Routine, Transfer
    }

    public enum Status {
        Requested, Dispatched, OnWay, Completed, Cancelled
    }
}
