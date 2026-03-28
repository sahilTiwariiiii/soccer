package com.samrat.jstojv.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "equipment_documents")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EquipmentDocument extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hospital_id")
    private Hospital hospital;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_id")
    private Branch branch;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "equipment_id")
    private Equipment equipment;

    @Column(name = "document_type")
    private String documentType;
    @Column(name = "file_url")
    private String fileUrl;
}
