package com.samrat.jstojv.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "branches")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Branch extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hospital_id", nullable = false)
    private Hospital hospital;

    @Column(nullable = false)
    private String name;

    @Column(name = "branch_code", nullable = false, unique = true)
    private String branchCode;

    @Enumerated(EnumType.STRING)
    @Column(name = "branch_type")
    private BranchType branchType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_head")
    private User branchHead;

    @Embedded
    @AttributeOverrides({
        @AttributeOverride(name = "name", column = @Column(name = "bm_name")),
        @AttributeOverride(name = "contactNumber", column = @Column(name = "bm_contact_number")),
        @AttributeOverride(name = "email", column = @Column(name = "bm_email")),
        @AttributeOverride(name = "employeeId", column = @Column(name = "bm_employee_id"))
    })
    private BranchManager branchManager;

    @Embedded
    @AttributeOverrides({
        @AttributeOverride(name = "name", column = @Column(name = "ms_name")),
        @AttributeOverride(name = "registrationNumber", column = @Column(name = "ms_registration_number"))
    })
    private MedicalSuperintendent medicalSuperintendent;

    @Embedded
    private Address address;

    @Embedded
    private GeoLocation geoLocation;

    private String contactNumber;

    private String email;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "branch_departments",
        joinColumns = @JoinColumn(name = "branch_id"),
        inverseJoinColumns = @JoinColumn(name = "department_id")
    )
    private List<Department> departments;

    @ElementCollection
    @CollectionTable(name = "branch_licenses", joinColumns = @JoinColumn(name = "branch_id"))
    private List<License> licenses;

    @Column(name = "total_floors")
    private Integer totalFloors;

    @Column(name = "total_rooms")
    private Integer totalRooms;

    @Column(name = "is_active")
    private boolean isActive = true;

    @Column(name = "is_verified")
    private boolean isVerified = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by")
    private User createdBy;

    public enum BranchType {
        General, Specialty, SuperSpecialty
    }

    @Embeddable
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class BranchManager {
        private String name;
        private String contactNumber;
        private String email;
        private String employeeId;
    }

    @Embeddable
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class MedicalSuperintendent {
        private String name;
        private String registrationNumber;
    }

    @Embeddable
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Address {
        private String line1;
        private String line2;
        private String city;
        private String state;
        private String pincode;
    }

    @Embeddable
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class GeoLocation {
        private Double latitude;
        private Double longitude;
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
        private LocalDateTime validTill;
        private String documentUrl;
        private boolean isVerified = false;
    }
}
