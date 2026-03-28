package com.samrat.jstojv.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "certificate_templates")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CertificateTemplate extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hospital_id", nullable = false)
    private Hospital hospital;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_id", nullable = false)
    private Branch branch;

    @Column(name = "template_name", nullable = false)
    private String templateName;

    private String category;

    private Integer version = 1;

    @Column(name = "layout_html", columnDefinition = "TEXT")
    private String layoutHtml;

    @Column(name = "layout_json", columnDefinition = "TEXT")
    private String layoutJson; // Stored as JSON string

    private String header;
    private String footer;

    @Column(name = "logo_url")
    private String logoUrl;

    @Column(name = "page_size")
    private String pageSize = "A4";

    @Enumerated(EnumType.STRING)
    private Orientation orientation = Orientation.portrait;

    @Column(name = "is_active")
    private boolean isActive = true;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by")
    private User createdBy;

    public enum Orientation {
        portrait, landscape
    }
}
