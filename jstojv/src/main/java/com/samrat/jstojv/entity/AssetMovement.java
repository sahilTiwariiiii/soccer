package com.samrat.jstojv.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "asset_movements")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AssetMovement extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hospital_id", nullable = false)
    private Hospital hospital;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "from_branch_id")
    private Branch fromBranch;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "to_branch_id")
    private Branch toBranch;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "asset_id")
    private AssetMaster asset;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "from_location")
    private AssetLocation fromLocation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "to_location")
    private AssetLocation toLocation;

    @Column(name = "transfer_date")
    private LocalDateTime transferDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "transferred_by")
    private User transferredBy;

    private String reason;
}
