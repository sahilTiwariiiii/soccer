package com.samrat.jstojv.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "blood_donations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BloodDonation extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hospital_id", nullable = false)
    private Hospital hospital;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_id", nullable = false)
    private Branch branch;

    @Column(name = "donation_number", nullable = false, unique = true)
    private String donationNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "donor_id", nullable = false)
    private BloodDonor donor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "camp_id")
    private BloodDonationCamp camp;

    @Column(name = "donation_date", nullable = false)
    private LocalDateTime donationDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "collected_by")
    private User collectedBy;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "blood_group_id")
    private BloodGroup bloodGroup;

    @Column(name = "quantity_ml")
    private Integer volume = 450;

    @Column(name = "bag_number", nullable = false)
    private String bagNumber;

    @Column(name = "expiry_date")
    private LocalDateTime expiryDate;

    @Enumerated(EnumType.STRING)
    private Status status = Status.Collected;

    public enum Status {
        Collected, Tested, Separated, Discarded
    }
}
