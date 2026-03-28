package com.samrat.jstojv.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "pharmacies")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Pharmacy extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_id", nullable = false)
    private Branch branch;

    @Column(nullable = false)
    private String name;

    @Column(name = "pharmacy_license_number", nullable = false)
    private String pharmacyLicenseNumber;

    @Column(name = "drug_license_valid_till")
    private LocalDateTime drugLicenseValidTill;

    @Column(name = "license_document_url")
    private String licenseDocumentUrl;

    @Embedded
    @AttributeOverrides({
        @AttributeOverride(name = "name", column = @Column(name = "pharmacist_name")),
        @AttributeOverride(name = "registrationNumber", column = @Column(name = "pharmacist_registration_number")),
        @AttributeOverride(name = "contactNumber", column = @Column(name = "pharmacist_contact_number"))
    })
    private PharmacistInCharge pharmacistInCharge;

    @Column(name = "is_license_verified")
    private boolean isLicenseVerified = false;

    @Column(name = "is_active")
    private boolean isActive = true;

    @Embeddable
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class PharmacistInCharge {
        private String name;
        private String registrationNumber;
        private String contactNumber;
    }
}
