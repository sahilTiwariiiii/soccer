package com.samrat.jstojv.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "radiology_reports")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RadiologyReport extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hospital_id", nullable = false)
    private Hospital hospital;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_id", nullable = false)
    private Branch branch;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "radiology_study_id", nullable = false)
    private RadiologyStudy radiologyStudy;

    @Column(columnDefinition = "TEXT")
    private String findings;
    @Column(columnDefinition = "TEXT")
    private String impression;

    @Enumerated(EnumType.STRING)
    @Column(name = "report_status")
    private ReportStatus reportStatus = ReportStatus.Draft;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reported_by")
    private User reportedBy;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "verified_by")
    private User verifiedBy;

    @Column(name = "verified_at")
    private LocalDateTime verifiedAt;

    public enum ReportStatus {
        Draft, Final, Verified
    }
}
