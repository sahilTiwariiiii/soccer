package com.samrat.jstojv.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "ambulance_maintenances")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AmbulanceMaintenance extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hospital_id", nullable = false)
    private Hospital hospital;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_id", nullable = false)
    private Branch branch;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ambulance_id", nullable = false)
    private AmbulanceMaster ambulance;

    @Column(name = "maintenance_date")
    private LocalDateTime maintenanceDate = LocalDateTime.now();

    @Enumerated(EnumType.STRING)
    private Type type = Type.Routine;

    private String description;

    private Double cost;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "performed_by")
    private User performedBy;

    public enum Type {
        Routine, Repair, Accident
    }
}
