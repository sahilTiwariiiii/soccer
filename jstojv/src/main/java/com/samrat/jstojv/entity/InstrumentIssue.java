package com.samrat.jstojv.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "instrument_issues")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InstrumentIssue extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hospital_id", nullable = false)
    private Hospital hospital;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_id", nullable = false)
    private Branch branch;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "batch_id", nullable = false)
    private InstrumentBatch batch;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "issued_to", nullable = false)
    private User issuedTo; // Doctor or nurse

    @Enumerated(EnumType.STRING)
    @Column(name = "issued_for")
    private IssuedFor issuedFor = IssuedFor.Surgery;

    @Column(name = "issued_quantity", nullable = false)
    private Integer issuedQuantity;

    @Column(name = "issued_at")
    private LocalDateTime issuedAt = LocalDateTime.now();

    @Column(name = "returned_at")
    private LocalDateTime returnedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "returned_by")
    private User returnedBy;

    @Enumerated(EnumType.STRING)
    private Status status = Status.Issued;

    public enum IssuedFor {
        Surgery, IPD, OPD
    }

    public enum Status {
        Issued, Returned
    }
}
