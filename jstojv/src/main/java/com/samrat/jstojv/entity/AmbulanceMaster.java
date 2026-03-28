package com.samrat.jstojv.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "ambulance_masters")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AmbulanceMaster extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hospital_id", nullable = false)
    private Hospital hospital;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_id", nullable = false)
    private Branch branch;

    @Column(name = "vehicle_number", nullable = false, unique = true)
    private String vehicleNumber;

    @Enumerated(EnumType.STRING)
    private Type type = Type.Basic;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "driver_id")
    private User driver;

    @Column(name = "contact_number")
    private String contactNumber;

    @Column(name = "is_active")
    private boolean isActive = true;

    public enum Type {
        Basic, Advanced, ICU
    }
}
