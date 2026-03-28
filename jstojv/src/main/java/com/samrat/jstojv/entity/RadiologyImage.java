package com.samrat.jstojv.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "radiology_images")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RadiologyImage extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hospital_id", nullable = false)
    private Hospital hospital;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_id", nullable = false)
    private Branch branch;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "radiology_study_id", nullable = false)
    private RadiologyStudy radiologyStudy;

    @Column(name = "image_url")
    private String imageUrl; // PACS URL

    @Column(name = "dicom_id")
    private String dicomId;
}
