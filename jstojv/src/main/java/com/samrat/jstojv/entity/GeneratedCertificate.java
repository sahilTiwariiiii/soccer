package com.samrat.jstojv.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "generated_certificates")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GeneratedCertificate extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hospital_id", nullable = false)
    private Hospital hospital;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_id", nullable = false)
    private Branch branch;

    @Column(name = "certificate_number", unique = true)
    private String certificateNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "certificate_type_id")
    private CertificateType certificateType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "template_id")
    private CertificateTemplate template;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id")
    private PatientRegistration patient;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id")
    private User doctor;

    @Column(name = "filled_data", columnDefinition = "TEXT")
    private String filledData; // Dynamic values stored as JSON string

    @Column(name = "issue_date")
    private LocalDateTime issueDate = LocalDateTime.now();

    @Enumerated(EnumType.STRING)
    private Status status;

    @Column(name = "pdf_path")
    private String pdfPath;

    @Column(name = "verification_code")
    private String verificationCode;

    @Column(name = "qr_code_url")
    private String qrCodeUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "issued_by")
    private User issuedBy;

    public enum Status {
        draft, issued, cancelled
    }
}
