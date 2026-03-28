package com.samrat.jstojv.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "hospitals")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Hospital extends BaseEntity {

    @Column(nullable = false)
    private String name;

    @Column(name = "legal_name", nullable = false)
    private String legalName;

    @Column(name = "registration_number", nullable = false)
    private String registrationNumber;

    @Column(name = "gst_number")
    private String gstNumber;

    @Column(name = "pan_number")
    private String panNumber;

    @Embedded
    @AttributeOverrides({
        @AttributeOverride(name = "name", column = @Column(name = "owner_name")),
        @AttributeOverride(name = "contactNumber", column = @Column(name = "owner_contact_number")),
        @AttributeOverride(name = "email", column = @Column(name = "owner_email")),
        @AttributeOverride(name = "aadhaarNumber", column = @Column(name = "owner_aadhaar_number"))
    })
    private OwnerDetails ownerDetails;

    @ElementCollection
    @CollectionTable(name = "hospital_licenses", joinColumns = @JoinColumn(name = "hospital_id"))
    private List<License> licenses;

    @Embedded
    private Address address;

    private String contactNumber;

    private String email;
    private String website;

    @Column(name = "is_active")
    private boolean isActive = true;

    @Column(name = "is_verified")
    private boolean isVerified = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by")
    private User createdBy;

    @Embeddable
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class OwnerDetails {
        private String name;
        private String contactNumber;
        private String email;
        private String aadhaarNumber;
    }

    @Embeddable
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class License {
        private String licenseType;
        private String licenseNumber;
        private LocalDateTime validFrom;
        private LocalDateTime validTill;
        private String documentUrl;
        private boolean isVerified = false;

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "verified_by")
        private User verifiedBy;

        private LocalDateTime verifiedAt;
    }

    @Embeddable
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Address {
        private String line1;
        private String city;
        private String state;
        private String pincode;
        private String country;
    }
}
