package com.samrat.jstojv.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "spare_parts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SparePart extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hospital_id")
    private Hospital hospital;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_id")
    private Branch branch;

    private String name;
    @Column(name = "part_number")
    private String partNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vendor_id")
    private EquipmentVendor vendor;

    @Column(name = "stock_quantity")
    private Integer stockQuantity;
}
