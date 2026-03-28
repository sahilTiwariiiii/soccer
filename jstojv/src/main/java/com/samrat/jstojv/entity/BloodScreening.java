package com.samrat.jstojv.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "blood_screenings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BloodScreening extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hospital_id", nullable = false)
    private Hospital hospital;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_id", nullable = false)
    private Branch branch;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "donation_id", nullable = false)
    private BloodDonation donation;

    private Boolean hiv;
    private Boolean hbsag;
    private Boolean hcv;
    private Boolean malaria;
    private Boolean syphilis;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tested_by")
    private User testedBy;

    @Column(name = "test_date")
    private LocalDateTime testDate;

    @Enumerated(EnumType.STRING)
    private Status status;

    public enum Status {
        Safe, Unsafe
    }
}
