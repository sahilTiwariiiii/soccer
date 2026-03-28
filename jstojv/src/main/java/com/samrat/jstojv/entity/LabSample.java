package com.samrat.jstojv.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "lab_samples")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LabSample extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hospital_id", nullable = false)
    private Hospital hospital;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_id", nullable = false)
    private Branch branch;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "investigation_order_id", nullable = false)
    private InvestigationOrder investigationOrder;

    @Column(name = "sample_type", nullable = false)
    private String sampleType;

    @Column(nullable = false)
    private String barcode;

    @Enumerated(EnumType.STRING)
    private Status status = Status.Collected;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "collected_by")
    private User collectedBy;

    @Column(name = "collected_at")
    private LocalDateTime collectedAt;

    @Column(name = "received_at")
    private LocalDateTime receivedAt;

    @Column(name = "processed_at")
    private LocalDateTime processedAt;

    public enum Status {
        Collected, Received, Processing, Completed
    }
}
