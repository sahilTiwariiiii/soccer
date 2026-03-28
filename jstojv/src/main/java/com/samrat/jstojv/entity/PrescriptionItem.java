package com.samrat.jstojv.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "prescription_items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PrescriptionItem extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "prescription_id", nullable = false)
    private PrescriptionHeader prescription;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "medicine_id")
    private MedicineMaster medicine;

    @Column(name = "medicine_name")
    private String medicineName;

    private String form;
    private String strength;
    private String dosage;
    private String frequency;
    private String duration;
    private String route;

    @Column(name = "quantity_prescribed", nullable = false)
    private Integer quantityPrescribed;

    @Column(name = "quantity_dispensed")
    private Integer quantityDispensed = 0;

    @Enumerated(EnumType.STRING)
    @Column(name = "item_status")
    private ItemStatus itemStatus = ItemStatus.Pending;

    public enum ItemStatus {
        Pending, PartiallyDispensed, Dispensed
    }
}
