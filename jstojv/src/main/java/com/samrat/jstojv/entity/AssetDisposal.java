package com.samrat.jstojv.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "asset_disposals")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AssetDisposal extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hospital_id", nullable = false)
    private Hospital hospital;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_id", nullable = false)
    private Branch branch;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "asset_id")
    private AssetMaster asset;

    @Enumerated(EnumType.STRING)
    @Column(name = "disposal_type")
    private DisposalType disposalType;

    @Column(name = "disposal_date")
    private LocalDateTime disposalDate;

    @Column(name = "disposal_amount")
    private Double disposalAmount;

    private String remarks;

    public enum DisposalType {
        sold, scrapped, donated, writeoff
    }
}
