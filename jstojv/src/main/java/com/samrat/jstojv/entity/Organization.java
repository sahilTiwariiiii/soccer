package com.samrat.jstojv.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "organizations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Organization extends BaseEntity {

    @Column(nullable = false)
    private String name;

    @Column(name = "registration_number")
    private String registrationNumber;

    @Column(name = "tax_id")
    private String taxId;

    private String email;
    private String phone;
    private String website;

    @Embedded
    private AddressInfo address;

    private String logo;

    @Embedded
    private SettingsInfo settings;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hospital_id")
    private Hospital hospital;

    @Embeddable
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class AddressInfo {
        private String street;
        private String city;
        private String state;
        @Column(name = "zip_code")
        private String zipCode;
        private String country;
    }

    @Embeddable
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class SettingsInfo {
        private String timezone = "UTC";
        private String currency = "INR";
        @Embedded
        private WorkHoursInfo workHours;
    }

    @Embeddable
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class WorkHoursInfo {
        private String start;
        private String end;
    }
}
