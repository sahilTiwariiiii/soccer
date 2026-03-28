package com.samrat.jstojv.service;

import com.samrat.jstojv.entity.*;
import com.samrat.jstojv.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EHRManagementService {

    private final PatientHistoryRepository patientHistoryRepository;
    private final PrescriptionRepository prescriptionRepository;

    // --- Patient History Operations ---
    @Transactional
    public PatientHistory addHistoryEntry(PatientHistory history) {
        return patientHistoryRepository.save(history);
    }

    public List<PatientHistory> getPatientHistory(Long patientId) {
        return patientHistoryRepository.findByPatientId(patientId);
    }

    // --- Prescription Operations ---
    @Transactional
    public Prescription createPrescription(Prescription prescription) {
        return prescriptionRepository.save(prescription);
    }

    public List<Prescription> getPatientPrescriptions(Long patientId) {
        return prescriptionRepository.findByPatientId(patientId);
    }
}
