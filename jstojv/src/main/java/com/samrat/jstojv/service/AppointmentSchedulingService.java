package com.samrat.jstojv.service;

import com.samrat.jstojv.entity.*;
import com.samrat.jstojv.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AppointmentSchedulingService {

    private final AppointmentRepository appointmentRepository;
    private final DoctorAvailabilityRepository doctorAvailabilityRepository;
    private final UserRepository userRepository;
    private final PatientRegistrationRepository patientRegistrationRepository;

    // --- Appointment Operations ---
    @Transactional
    public Appointment bookAppointment(Appointment appointment) {
        // Validate doctor availability logic can be added here
        appointment.setStatus(Appointment.Status.Scheduled);
        return appointmentRepository.save(appointment);
    }

    public List<Appointment> getDoctorAppointments(Long doctorId, LocalDateTime start, LocalDateTime end) {
        return appointmentRepository.findByDoctorIdAndAppointmentDateBetween(doctorId, start, end);
    }

    @Transactional
    public Appointment updateAppointmentStatus(Long id, Appointment.Status status) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
        appointment.setStatus(status);
        return appointmentRepository.save(appointment);
    }

    // --- Doctor Availability Operations ---
    @Transactional
    public DoctorAvailability setAvailability(DoctorAvailability availability) {
        return doctorAvailabilityRepository.save(availability);
    }

    public List<DoctorAvailability> getDoctorAvailability(Long doctorId) {
        return doctorAvailabilityRepository.findByDoctorId(doctorId);
    }
}
