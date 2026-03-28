package com.samrat.jstojv.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "doctor_documents")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DoctorDocument extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hospital_id", nullable = false)
    private Hospital hospital;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id", nullable = false)
    private User doctor;

    @ElementCollection
    @CollectionTable(name = "doctor_document_items", joinColumns = @JoinColumn(name = "doctor_document_id"))
    private List<DocumentItem> documents;

    @Column(name = "digital_signature_url")
    private String digitalSignatureUrl;

    @Embeddable
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class DocumentItem {
        @Column(name = "document_type")
        private String documentType;
        @Column(name = "file_url")
        private String fileUrl;
        @Column(name = "uploaded_at")
        private LocalDateTime uploadedAt = LocalDateTime.now();
    }
}
