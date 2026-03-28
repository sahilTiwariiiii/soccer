package com.samrat.jstojv.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "stock_transfers")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StockTransfer extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hospital_id", nullable = false)
    private Hospital hospital;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "from_branch_id", nullable = false)
    private Branch fromBranch;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "to_branch_id", nullable = false)
    private Branch toBranch;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "medicine_id", nullable = false)
    private MedicineMaster medicine;

    @Column(name = "batch_number")
    private String batchNumber;

    private Integer quantity;

    @Enumerated(EnumType.STRING)
    private Status status = Status.Requested;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "approved_by")
    private User approvedBy;

    public enum Status {
        Requested, Approved, InTransit, Completed
    }
}
