package com.samrat.jstojv.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.Map;

@Entity
@Table(name = "visit_vitals")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VisitVital extends BaseEntity {

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "visit_id", nullable = false, unique = true)
    private PatientVisit visit;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id", nullable = false)
    private Department department;

    @ElementCollection
    @CollectionTable(name = "visit_vital_values", joinColumns = @JoinColumn(name = "visit_vital_id"))
    @MapKeyColumn(name = "vital_key")
    @Column(name = "vital_value")
    private Map<String, String> vitals;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recorded_by")
    private User recordedBy;
}
