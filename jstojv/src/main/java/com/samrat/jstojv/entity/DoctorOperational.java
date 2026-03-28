package com.samrat.jstojv.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "doctor_operationals")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DoctorOperational extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hospital_id", nullable = false)
    private Hospital hospital;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id", nullable = false)
    private User doctor;

    @ElementCollection
    @CollectionTable(name = "doctor_schedules", joinColumns = @JoinColumn(name = "doctor_operational_id"))
    private List<Schedule> schedule;

    @ElementCollection
    @CollectionTable(name = "doctor_leaves", joinColumns = @JoinColumn(name = "doctor_operational_id"))
    private List<LeaveItem> leaves;

    @ElementCollection
    @CollectionTable(name = "doctor_shifts", joinColumns = @JoinColumn(name = "doctor_operational_id"))
    private List<ShiftItem> shifts;

    @Column(name = "max_appointments_per_day")
    private Integer maxAppointmentsPerDay = 50;

    @Embeddable
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Schedule {
        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "branch_id", nullable = false)
        private Branch branch;

        @Column(name = "day_of_week", nullable = false)
        private Integer dayOfWeek; // 0-6

        @Column(name = "start_time")
        private String startTime;
        @Column(name = "end_time")
        private String endTime;
        @Column(name = "slot_duration")
        private Integer slotDuration = 15;
    }

    @Embeddable
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class LeaveItem {
        @Column(name = "from_date")
        private LocalDateTime fromDate;
        @Column(name = "to_date")
        private LocalDateTime toDate;
        private String reason;
        @Enumerated(EnumType.STRING)
        private LeaveStatus status = LeaveStatus.Pending;
    }

    @Embeddable
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ShiftItem {
        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "branch_id", nullable = false)
        private Branch branch;

        @Column(name = "shift_name")
        private String shiftName;
        @Column(name = "start_time")
        private String startTime;
        @Column(name = "end_time")
        private String endTime;
    }

    public enum LeaveStatus {
        Pending, Approved, Rejected
    }
}
