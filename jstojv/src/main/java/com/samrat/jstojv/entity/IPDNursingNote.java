package com.samrat.jstojv.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "ipd_nursing_notes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class IPDNursingNote extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hospital_id", nullable = false)
    private Hospital hospital;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_id", nullable = false)
    private Branch branch;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ipd_id", nullable = false)
    private IPDAdmission ipdAdmission;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "nurse_id", nullable = false)
    private User nurse;

    @Column(columnDefinition = "TEXT")
    private String note;
}
