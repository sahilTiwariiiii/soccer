package com.samrat.jstojv.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "salary_structures")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SalaryStructure extends BaseEntity {

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(nullable = false)
    private Double basic;

    private Double hra = 0.0;
    private Double conveyance = 0.0;
    @Column(name = "special_allowance")
    private Double specialAllowance = 0.0;
    @Column(name = "medical_allowance")
    private Double medicalAllowance = 0.0;

    @ElementCollection
    @CollectionTable(name = "salary_structure_deductions", joinColumns = @JoinColumn(name = "salary_structure_id"))
    private List<Deduction> deductions;

    @Column(name = "pf_enabled")
    private boolean pfEnabled = true;

    @Column(name = "esi_enabled")
    private boolean esiEnabled = true;

    @Column(name = "total_gross")
    private Double totalGross;

    @Column(name = "total_net")
    private Double totalNet;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hospital_id")
    private Hospital hospital;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_id")
    private Branch branch;

    @Embeddable
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Deduction {
        private String name;
        private Double amount;
    }
}
