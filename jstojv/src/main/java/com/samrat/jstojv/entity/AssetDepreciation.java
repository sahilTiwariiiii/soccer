package com.samrat.jstojv.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "asset_depreciations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AssetDepreciation extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hospital_id", nullable = false)
    private Hospital hospital;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_id", nullable = false)
    private Branch branch;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "asset_id")
    private AssetMaster asset;

    @Column(name = "depreciation_amount")
    private Double depreciationAmount;

    @Column(name = "depreciation_date")
    private LocalDateTime depreciationDate;

    @Column(name = "book_value")
    private Double bookValue;
}
