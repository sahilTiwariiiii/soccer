package com.samrat.jstojv.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "patient_registrations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PatientRegistration extends BaseEntity {

    @Column(unique = true)
    private String uhid;

    @Column(nullable = false, unique = true)
    private String mobile;

    private String email;

    @Column(name = "patient_name", nullable = false)
    private String patientName;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Enumerated(EnumType.STRING)
    @Column(name = "marital_status")
    private MaritalStatus maritalStatus;

    @Column(nullable = false)
    private LocalDate dob;

    private Integer age;

    @Enumerated(EnumType.STRING)
    @Column(name = "relation_type")
    private RelationType relationType;

    @Column(name = "guardian_name")
    private String guardianName;

    private String address;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "country_id", nullable = false)
    private Country country;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "state_id")
    private State state;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "city_id")
    private City city;

    @Enumerated(EnumType.STRING)
    @Column(name = "blood_group")
    private BloodGroup bloodGroup = BloodGroup.NA;

    @Enumerated(EnumType.STRING)
    private Source source;

    @Column(name = "patient_image")
    private String patientImage;

    public enum Gender {
        Male, Female, Other
    }

    public enum MaritalStatus {
        Single, Married, Widow, Divorced
    }

    public enum RelationType {
        SO, DO, WO
    }

    public enum BloodGroup {
        A_POS, A_NEG, B_POS, B_NEG, O_POS, O_NEG, AB_POS, AB_NEG, NA
    }

    public enum Source {
        SELF, ADV_HOARDING, DOCTOR, ONLINE, CAMP
    }
}
