package com.samrat.jstojv.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "asset_masters")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AssetMaster extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hospital_id", nullable = false)
    private Hospital hospital;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_id", nullable = false)
    private Branch branch;

    @Column(name = "asset_name", nullable = false)
    private String assetName;

    @Column(name = "asset_code", unique = true)
    private String assetCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private AssetCategory category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subcategory_id")
    private AssetSubCategory subCategory;

    private String brand;
    private String model;

    @Column(name = "serial_number")
    private String serialNumber;

    private String barcode;
    @Column(name = "qr_code")
    private String qrCode;

    @Column(name = "purchase_date")
    private LocalDateTime purchaseDate;

    @Column(name = "purchase_cost")
    private Double purchaseCost;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vendor_id")
    private AssetVendor vendor;

    @Column(name = "warranty_expiry")
    private LocalDateTime warrantyExpiry;

    @Column(name = "depreciation_method")
    private String depreciationMethod;

    @Column(name = "depreciation_rate")
    private Double depreciationRate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id")
    private Department department;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "location_id")
    private AssetLocation location;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assigned_staff_id")
    private User assignedStaff;

    @Enumerated(EnumType.STRING)
    private Status status = Status.available;

    public enum Status {
        available, assigned, maintenance, disposed
    }
}
