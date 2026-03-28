package com.samrat.jstojv.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "asset_maintenances")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AssetMaintenance extends BaseEntity {

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
    @Column(name = "maintenance_type")
    private MaintenanceType maintenanceType;

    @Column(name = "technician_name")
    private String technicianName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vendor_id")
    private AssetVendor vendor;

    @Column(name = "maintenance_date")
    private LocalDateTime maintenanceDate;

    private Double cost;

    @Column(name = "next_maintenance_date")
    private LocalDateTime nextMaintenanceDate;

    @Enumerated(EnumType.STRING)
    private Status status = Status.scheduled;

    private String description;

    public enum MaintenanceType {
        preventive, repair, breakdown
    }

    public enum Status {
        scheduled, in_progress, completed
    }
}
