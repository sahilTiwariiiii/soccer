package com.samrat.jstojv.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "department_vitals")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DepartmentVital extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id", nullable = false)
    private Department department;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vital_id", nullable = false)
    private GlobalVital vital;

    @Column(name = "is_mandatory")
    private boolean isMandatory = false;

    @Column(name = "display_order")
    private Integer displayOrder = 0;
}
