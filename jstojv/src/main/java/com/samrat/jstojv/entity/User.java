package com.samrat.jstojv.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User extends BaseEntity {

    @Column(name = "employee_id", nullable = false, unique = true)
    private String employeeId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hospital_id", nullable = false)
    private Hospital hospital;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_id", nullable = false)
    private Branch branch;

    @Column(nullable = false)
    private String phone;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id", nullable = false)
    private Department department;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "manager_id")
    private User manager;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "user_wards",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "ward_id")
    )
    private List<Ward> assignedWards;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "floor_id")
    private Floor floor;

    @Column(name = "profile_picture")
    private String profilePicture;

    private String address;

    @ElementCollection
    @CollectionTable(name = "user_documents", joinColumns = @JoinColumn(name = "user_id"))
    private List<UserDocument> documents;

    @Column(name = "pin_code")
    private String pinCode;

    private String qualification;

    private String specialization;

    @Embedded
    private Shift shift;

    @ElementCollection
    @CollectionTable(name = "user_permissions", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "permission")
    private List<String> permissions;

    @Column(nullable = false)
    private String password;

    @Embeddable
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class UserDocument {
        @Column(name = "document_id")
        private String documentId;
        private String type;
        private String value;
    }

    @Embeddable
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Shift {
        @Column(name = "start_time")
        private String startTime;
        @Column(name = "end_time")
        private String endTime;
        @ElementCollection
        @CollectionTable(name = "user_shift_days", joinColumns = @JoinColumn(name = "user_id"))
        @Column(name = "day")
        private List<String> days;
    }
}
