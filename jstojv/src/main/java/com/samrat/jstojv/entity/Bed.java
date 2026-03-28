package com.samrat.jstojv.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "beds")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Bed extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hospital_id", nullable = false)
    private Hospital hospital;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_id", nullable = false)
    private Branch branch;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id", nullable = false)
    private Room room;

    @Column(name = "bed_number", nullable = false)
    private String bedNumber;

    @Enumerated(EnumType.STRING)
    @Column(name = "bed_type")
    private BedType bedType;

    @Enumerated(EnumType.STRING)
    private BedStatus status = BedStatus.Available;

    public enum BedType {
        General, ICU, SemiPrivate, Private
    }

    public enum BedStatus {
        Available, Occupied, Cleaning, Maintenance
    }
}
