package com.samrat.jstojv.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "global_vitals")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GlobalVital extends BaseEntity {

    @Column(nullable = false)
    private String name;

    private String unit;

    @Enumerated(EnumType.STRING)
    @Column(name = "data_type")
    private DataType dataType = DataType.number;

    @Column(name = "normal_min")
    private Double normalMin;

    @Column(name = "normal_max")
    private Double normalMax;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id")
    private Department department; // null = GLOBAL vital

    @Column(name = "is_active")
    private boolean isActive = true;

    public enum DataType {
        number, text, boolean_type
    }
}
