package com.samrat.jstojv.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "radiology_studies")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RadiologyStudy extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hospital_id", nullable = false)
    private Hospital hospital;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_id", nullable = false)
    private Branch branch;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "investigation_order_id", nullable = false)
    private InvestigationOrder investigationOrder;

    @Column(nullable = false)
    private String modality; // XRay, CT, MRI, USG

    @Enumerated(EnumType.STRING)
    private Status status = Status.Scheduled;

    @Column(name = "scheduled_at")
    private LocalDateTime scheduledAt;

    @Column(name = "started_at")
    private LocalDateTime startedAt;

    @Column(name = "completed_at")
    private LocalDateTime completedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "radiologist_id")
    private User radiologist;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "technician_id")
    private User technician;

    public enum Status {
        Scheduled, Checked_In, In_Progress, Completed, Reported, Verified
    }
}
