package com.samrat.jstojv.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "attendances")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Attendance extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private LocalDateTime date;

    @Embedded
    @AttributeOverrides({
        @AttributeOverride(name = "time", column = @Column(name = "clock_in_time")),
        @AttributeOverride(name = "location.lat", column = @Column(name = "clock_in_lat")),
        @AttributeOverride(name = "location.lng", column = @Column(name = "clock_in_lng")),
        @AttributeOverride(name = "device", column = @Column(name = "clock_in_device")),
        @AttributeOverride(name = "ip", column = @Column(name = "clock_in_ip"))
    })
    private ClockInfo clockIn;

    @Embedded
    @AttributeOverrides({
        @AttributeOverride(name = "time", column = @Column(name = "clock_out_time")),
        @AttributeOverride(name = "location.lat", column = @Column(name = "clock_out_lat")),
        @AttributeOverride(name = "location.lng", column = @Column(name = "clock_out_lng")),
        @AttributeOverride(name = "device", column = @Column(name = "clock_out_device")),
        @AttributeOverride(name = "ip", column = @Column(name = "clock_out_ip"))
    })
    private ClockInfo clockOut;

    @Enumerated(EnumType.STRING)
    private Status status = Status.Present;

    @Column(name = "work_hours")
    private Double workHours = 0.0;

    private Double overtime = 0.0;

    @Column(name = "is_regularized")
    private boolean isRegularized = false;

    @Column(name = "regularization_reason")
    private String regularizationReason;

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
    public static class ClockInfo {
        private LocalDateTime time;
        @Embedded
        private LocationInfo location;
        private String device;
        private String ip;
    }

    @Embeddable
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class LocationInfo {
        private Double lat;
        private Double lng;
    }

    public enum Status {
        Present, Absent, Late, Half_day, On_Leave
    }
}
