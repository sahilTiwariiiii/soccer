package com.samrat.jstojv.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "equipments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Equipment extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hospital_id", nullable = false)
    private Hospital hospital;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_id", nullable = false)
    private Branch branch;

    @Column(nullable = false)
    private String name;

    @Column(name = "equipment_code", nullable = false, unique = true)
    private String equipmentCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private EquipmentCategory category;

    private String brand;
    private String model;
    @Column(name = "serial_number")
    private String serialNumber;

    @Column(name = "purchase_date")
    private LocalDateTime purchaseDate;
    @Column(name = "purchase_cost")
    private Double purchaseCost;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vendor_id")
    private EquipmentVendor vendor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id")
    private EquipmentDepartment department;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "location_id")
    private EquipmentLocation location;

    @Enumerated(EnumType.STRING)
    private Status status = Status.active;

    @Column(name = "warranty_expiry")
    private LocalDateTime warrantyExpiry;

    private String notes;

    public enum Status {
        active, maintenance, broken, retired
    }
}
