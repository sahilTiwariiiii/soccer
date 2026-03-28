package com.samrat.jstojv.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "addictions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Addiction extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id")
    private PatientRegistration patient;

    private String type; // Tobacco, Alcohol
    private String duration;
    private Integer units;
    private String frequency;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by_user_id")
    private User createdByUser;

    @Enumerated(EnumType.STRING)
    private Status status;

    public enum Status {
        Ongoing, Stopped
    }
}
