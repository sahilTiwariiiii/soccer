package com.samrat.jstojv.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "holidays", uniqueConstraints = {@UniqueConstraint(columnNames = "date")})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Holiday extends BaseEntity {

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private LocalDateTime date;

    @Enumerated(EnumType.STRING)
    private Type type = Type.National;

    private String description;

    @Column(nullable = false)
    private Integer year;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hospital_id")
    private Hospital hospital;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_id")
    private Branch branch;

    public enum Type {
        National, Regional, Company_specific, Optional
    }
}
