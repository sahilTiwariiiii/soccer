package com.samrat.jstojv.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "certificate_verifications")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CertificateVerification extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hospital_id", nullable = false)
    private Hospital hospital;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_id", nullable = false)
    private Branch branch;

    @Column(name = "certificate_number")
    private String certificateNumber;

    @Enumerated(EnumType.STRING)
    private Status status = Status.valid;

    @Column(name = "verification_timestamp")
    private LocalDateTime verificationTimestamp = LocalDateTime.now();

    @Column(name = "ip_address")
    private String ipAddress;

    private String location;

    public enum Status {
        valid, invalid
    }
}
