package com.samrat.jstojv.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "audit_logs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuditLog extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hospital_id", nullable = false)
    private Hospital hospital;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_id", nullable = false)
    private Branch branch;

    @Column(nullable = false)
    private LocalDateTime timestamp = LocalDateTime.now();

    @Embedded
    @AttributeOverrides({
        @AttributeOverride(name = "name", column = @Column(name = "user_name")),
        @AttributeOverride(name = "role", column = @Column(name = "user_role")),
        @AttributeOverride(name = "id", column = @Column(name = "user_id"))
    })
    private UserDetails user;

    @Column(nullable = false)
    private String action;

    @Column(nullable = false)
    private String module;

    private String description;

    @Column(name = "ip_address")
    private String ipAddress;

    @Enumerated(EnumType.STRING)
    private Severity severity = Severity.info;

    @Column(columnDefinition = "TEXT")
    private String details;

    public enum Severity {
        info, warning, error, critical
    }

    @Embeddable
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class UserDetails {
        private String name;
        private String role;
        private Long id;
    }
}
