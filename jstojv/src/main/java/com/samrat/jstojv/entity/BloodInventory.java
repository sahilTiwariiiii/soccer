package com.samrat.jstojv.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "blood_inventories")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BloodInventory extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hospital_id", nullable = false)
    private Hospital hospital;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_id", nullable = false)
    private Branch branch;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "component_id", nullable = false)
    private BloodComponent component;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "blood_group_id")
    private BloodGroup bloodGroup;

    @Column(name = "bag_number")
    private String bagNumber;

    @Column(name = "volume")
    private Integer volume;

    @Column(name = "collection_date")
    private java.time.LocalDateTime collectionDate;

    @Column(name = "expiry_date")
    private java.time.LocalDateTime expiryDate;

    @Enumerated(EnumType.STRING)
    private Status status = Status.Available;

    public enum Status {
        Available, Reserved, Issued, Expired, Discarded
    }
}
