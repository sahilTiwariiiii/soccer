package com.samrat.jstojv.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "blood_donors")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BloodDonor extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hospital_id", nullable = false)
    private Hospital hospital;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_id", nullable = false)
    private Branch branch;

    @Column(name = "donor_id", nullable = false, unique = true)
    private String donorId;

    @Column(name = "first_name")
    private String firstName;
    @Column(name = "last_name")
    private String lastName;
    private String gender;
    private LocalDateTime dob;
    private String phone;
    private String email;
    private String address;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "blood_group_id")
    private BloodGroup bloodGroup;

    private Double weight;
    private Double hemoglobin;

    @Column(name = "last_donation_date")
    private LocalDateTime lastDonationDate;
    @Column(name = "total_donations")
    private Integer totalDonations = 0;

    @Enumerated(EnumType.STRING)
    private Status status = Status.Active;

    public enum Status {
        Active, Deferred, Blacklisted
    }
}
