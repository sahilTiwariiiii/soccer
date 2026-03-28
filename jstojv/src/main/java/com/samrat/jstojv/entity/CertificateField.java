package com.samrat.jstojv.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "certificate_fields")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CertificateField extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hospital_id", nullable = false)
    private Hospital hospital;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_id", nullable = false)
    private Branch branch;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "template_id", nullable = false)
    private CertificateTemplate template;

    @Column(name = "field_name", nullable = false)
    private String fieldName;

    private String label;

    @Enumerated(EnumType.STRING)
    @Column(name = "data_type")
    private DataType dataType;

    @Column(name = "placeholder_key", nullable = false)
    private String placeholderKey;

    private boolean required = false;

    @Column(name = "validation_rules", columnDefinition = "TEXT")
    private String validationRules; // Stored as JSON string

    @Column(name = "field_order")
    private Integer order;

    public enum DataType {
        text, number, date, textarea, boolean_type
    }
}
