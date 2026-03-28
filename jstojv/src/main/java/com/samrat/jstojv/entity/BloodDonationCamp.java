package com.samrat.jstojv.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "blood_donation_camps")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BloodDonationCamp extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hospital_id", nullable = false)
    private Hospital hospital;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_id", nullable = false)
    private Branch branch;

    @Column(name = "camp_name")
    private String campName;
    private String location;
    @Column(name = "start_date")
    private LocalDateTime startDate;
    @Column(name = "end_date")
    private LocalDateTime endDate;

    @Column(name = "organized_by")
    private String organizedBy;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_in_charge")
    private User doctorInCharge;
}
