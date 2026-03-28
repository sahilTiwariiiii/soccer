package com.samrat.jstojv.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "payrolls", uniqueConstraints = {@UniqueConstraint(columnNames = {"user_id", "month", "year"})})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Payroll extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private Integer month;

    @Column(nullable = false)
    private Integer year;

    private Double basic;
    private Double hra;
    private Double conveyance;
    @Column(name = "special_allowance")
    private Double specialAllowance;
    @Column(name = "medical_allowance")
    private Double medicalAllowance;
    @Column(name = "total_earnings")
    private Double totalEarnings;

    @Column(name = "pf_deduction")
    private Double pfDeduction;
    @Column(name = "esi_deduction")
    private Double esiDeduction;
    @Column(name = "professional_tax")
    private Double professionalTax;
    @Column(name = "tds_deduction")
    private Double tdsDeduction;

    @ElementCollection
    @CollectionTable(name = "payroll_other_deductions", joinColumns = @JoinColumn(name = "payroll_id"))
    private List<OtherDeduction> otherDeductions;

    @Column(name = "total_deductions")
    private Double totalDeductions;

    @Column(name = "net_salary")
    private Double netSalary;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_status")
    private Status paymentStatus = Status.Pending;

    @Column(name = "payment_date")
    private LocalDateTime paymentDate;

    @Column(name = "payment_reference")
    private String paymentReference;

    @Column(name = "payslip_url")
    private String payslipUrl;

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
    public static class OtherDeduction {
        private String name;
        private Double amount;
    }

    public enum Status {
        Pending, Processed, Paid, Failed
    }
}
