package com.samrat.jstojv.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "past_surgical_histories")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PastSurgicalHistory extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id")
    private PatientRegistration patient;

    @Column(name = "surgery_name")
    private String surgeryName;

    @Column(name = "surgery_date")
    private LocalDateTime surgeryDate;

    @Column(name = "surgeon_name")
    private String surgeonName;

    private String hospital;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by_user_id")
    private User createdByUser;
}
