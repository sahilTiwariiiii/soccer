package com.samrat.jstojv.controller;

import com.samrat.jstojv.entity.*;
import com.samrat.jstojv.service.AppointmentSchedulingService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/v1/appointments")
@RequiredArgsConstructor
public class AppointmentSchedulingController {

    private final AppointmentSchedulingService appointmentSchedulingService;

    // Appointment Endpoints
    @PostMapping
    public ResponseEntity<Appointment> bookAppointment(@RequestBody Appointment appointment) {
        return new ResponseEntity<>(appointmentSchedulingService.bookAppointment(appointment), HttpStatus.CREATED);
    }

    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<Appointment>> getDoctorAppointments(
            @PathVariable Long doctorId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
        return ResponseEntity.ok(appointmentSchedulingService.getDoctorAppointments(doctorId, start, end));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Appointment> updateStatus(@PathVariable Long id, @RequestParam Appointment.Status status) {
        return ResponseEntity.ok(appointmentSchedulingService.updateAppointmentStatus(id, status));
    }

    // Availability Endpoints
    @PostMapping("/availability")
    public ResponseEntity<DoctorAvailability> setAvailability(@RequestBody DoctorAvailability availability) {
        return new ResponseEntity<>(appointmentSchedulingService.setAvailability(availability), HttpStatus.CREATED);
    }

    @GetMapping("/availability/{doctorId}")
    public ResponseEntity<List<DoctorAvailability>> getAvailability(@PathVariable Long doctorId) {
        return ResponseEntity.ok(appointmentSchedulingService.getDoctorAvailability(doctorId));
    }
}
