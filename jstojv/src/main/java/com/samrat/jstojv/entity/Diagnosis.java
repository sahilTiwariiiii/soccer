package com.samrat.jstojv.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "diagnoses")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Diagnosis extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "visit_id", nullable = false)
    private PatientVisit visit;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id")
    private PatientRegistration patient;

    @Enumerated(EnumType.STRING)
    @Column(name = "diagnosis_type")
    private DiagnosisType diagnosisType;

    @Column(name = "diagnosis_name")
    private String diagnosisName;

    @Column(name = "icd_code")
    private String icdCode;

    private String notes;

    public enum DiagnosisType {
        Provisional, Final
    }
}
