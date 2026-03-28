package com.samrat.jstojv.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "rooms")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Room extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hospital_id", nullable = false)
    private Hospital hospital;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_id", nullable = false)
    private Branch branch;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "floor_id", nullable = false)
    private Floor floor;

    @Column(name = "room_number", nullable = false)
    private String roomNumber;

    @Column(name = "room_name")
    private String roomName;

    @Enumerated(EnumType.STRING)
    @Column(name = "room_type")
    private RoomType roomType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id")
    private Department department;

    private Integer capacity = 1;

    @Enumerated(EnumType.STRING)
    private RoomStatus status = RoomStatus.Available;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assigned_doctor")
    private User assignedDoctor;

    private String notes;

    public enum RoomType {
        Consultation, Ward, ICU, OT, Lab, Radiology, Pharmacy, Office, WaitingArea
    }

    public enum RoomStatus {
        Available, Occupied, Maintenance
    }
}
