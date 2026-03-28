package com.samrat.jstojv.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "current_treatments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CurrentTreatment extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "visit_id", nullable = false)
    private PatientVisit visit;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id", nullable = false)
    private User doctor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    private PatientRegistration patient;

    @ElementCollection
    @CollectionTable(name = "current_treatment_medicines", joinColumns = @JoinColumn(name = "treatment_id"))
    private List<MedicineInfo> medicines;

    @Column(name = "pharmacy_notes", columnDefinition = "TEXT")
    private String pharmacyNotes;

    private Integer refills = 0;

    @Embeddable
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class MedicineInfo {
        private String name;
        private String dosage;
        private String frequency;
        private String duration;
    }
}
