package com.samrat.jstojv.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "doctor_service_mappings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DoctorServiceMapping extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hospital_id", nullable = false)
    private Hospital hospital;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id", nullable = false)
    private User doctor;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "doctor_services",
        joinColumns = @JoinColumn(name = "doctor_service_mapping_id"),
        inverseJoinColumns = @JoinColumn(name = "service_id")
    )
    private List<HospitalService> services;
}
