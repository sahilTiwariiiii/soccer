package com.samrat.jstojv.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "floors")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Floor extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hospital_id", nullable = false)
    private Hospital hospital;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_id", nullable = false)
    private Branch branch;

    @Column(name = "floor_name", nullable = false)
    private String floorName;

    @Column(name = "floor_number", nullable = false)
    private Integer floorNumber;

    @Enumerated(EnumType.STRING)
    @Column(name = "floor_type")
    private FloorType floorType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "floor_manager")
    private User floorManager;

    private String description;

    @Column(name = "total_rooms")
    private Integer totalRooms = 0;

    @Column(name = "is_active")
    private boolean isActive = true;

    public enum FloorType {
        OPD, Ward, ICU, Administration, OperationTheatre, Diagnostics, Mixed
    }
}
