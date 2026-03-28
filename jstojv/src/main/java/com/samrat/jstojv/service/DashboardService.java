package com.samrat.jstojv.service;

import com.samrat.jstojv.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final PatientRegistrationRepository patientRegistrationRepository;
    private final PatientVisitRepository patientVisitRepository;
    private final IPDAdmissionRepository ipdAdmissionRepository;
    private final AppointmentRepository appointmentRepository;
    private final InvoiceRepository invoiceRepository;

    public Map<String, Object> getHospitalStats() {
        Map<String, Object> stats = new HashMap<>();
        
        stats.put("totalPatients", patientRegistrationRepository.count());
        stats.put("totalVisits", patientVisitRepository.count());
        stats.put("activeAdmissions", ipdAdmissionRepository.count()); // Should filter by status in real app
        stats.put("totalAppointments", appointmentRepository.count());
        // In real app, we'd sum invoice amounts
        stats.put("totalInvoices", invoiceRepository.count());
        
        return stats;
    }
}
