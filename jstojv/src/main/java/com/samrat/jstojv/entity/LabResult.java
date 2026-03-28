package com.samrat.jstojv.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "lab_results")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LabResult extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hospital_id", nullable = false)
    private Hospital hospital;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_id", nullable = false)
    private Branch branch;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "investigation_order_id", nullable = false)
    private InvestigationOrder investigationOrder;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lab_sample_id", nullable = false)
    private LabSample labSample;

    @ElementCollection
    @CollectionTable(name = "lab_result_parameters", joinColumns = @JoinColumn(name = "lab_result_id"))
    private List<ParameterResult> parameters;

    @Enumerated(EnumType.STRING)
    @Column(name = "result_status")
    private ResultStatus resultStatus = ResultStatus.Pending;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "verified_by")
    private User verifiedBy;

    @Column(name = "verified_at")
    private LocalDateTime verifiedAt;

    @Embeddable
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ParameterResult {
        @Column(name = "parameter_name")
        private String parameterName;
        private String value;
        private String unit;
        @Column(name = "normal_range")
        private String normalRange;
        @Column(name = "is_abnormal")
        private boolean isAbnormal = false;
    }

    public enum ResultStatus {
        Pending, Completed, Verified
    }
}
