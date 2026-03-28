package com.samrat.jstojv.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "medicine_masters")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MedicineMaster extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hospital_id", nullable = false)
    private Hospital hospital;

    @Column(nullable = false)
    private String name;

    @Column(name = "generic_name")
    private String genericName;

    @Column(name = "brand_name")
    private String brandName;

    private String category;

    @Enumerated(EnumType.STRING)
    @Column(name = "schedule_type")
    private ScheduleType scheduleType;

    private String form;
    private String strength;

    private String manufacturer;

    @Column(name = "hsn_code")
    private String hsnCode;

    @Column(name = "gst_percentage")
    private Double gstPercentage;

    @Column(name = "is_active")
    private boolean isActive = true;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by")
    private User createdBy;

    public enum ScheduleType {
        OTC, ScheduleH, ScheduleX
    }
}
