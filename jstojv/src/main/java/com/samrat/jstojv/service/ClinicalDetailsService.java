package com.samrat.jstojv.service;

import com.samrat.jstojv.entity.*;
import com.samrat.jstojv.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ClinicalDetailsService {

    private final AddictionRepository addictionRepository;
    private final DiagnosisRepository diagnosisRepository;
    private final DoctorNotesRepository doctorNotesRepository;
    private final PersonalHistoryRepository personalHistoryRepository;
    private final PastMedicalHistoryRepository pastMedicalHistoryRepository;
    private final PastSurgicalHistoryRepository pastSurgicalHistoryRepository;
    private final CurrentTreatmentRepository currentTreatmentRepository;

    // --- Addiction Operations ---
    @Transactional
    public Addiction createAddiction(Addiction addiction) {
        return addictionRepository.save(addiction);
    }

    public List<Addiction> getPatientAddictions(Long patientId) {
        return addictionRepository.findByPatientId(patientId);
    }

    @Transactional
    public void deleteAddiction(Long id) {
        addictionRepository.deleteById(id);
    }

    // --- Diagnosis Operations ---
    @Transactional
    public Diagnosis createDiagnosis(Diagnosis diagnosis) {
        return diagnosisRepository.save(diagnosis);
    }

    public List<Diagnosis> getDiagnosisByPatient(Long patientId) {
        return diagnosisRepository.findByPatientId(patientId);
    }

    public List<Diagnosis> getDiagnosisByVisit(Long visitId) {
        return diagnosisRepository.findByVisitId(visitId);
    }

    // --- Doctor Notes Operations ---
    @Transactional
    public DoctorNotes createDoctorNote(DoctorNotes note) {
        return doctorNotesRepository.save(note);
    }

    public List<DoctorNotes> getDoctorNotesByVisit(Long visitId) {
        return doctorNotesRepository.findByVisitId(visitId);
    }

    // --- History Operations ---
    @Transactional
    public PastMedicalHistory createMedicalHistory(PastMedicalHistory history) {
        return pastMedicalHistoryRepository.save(history);
    }

    public List<PastMedicalHistory> getMedicalHistory(Long patientId) {
        return pastMedicalHistoryRepository.findByPatientId(patientId);
    }

    @Transactional
    public PastSurgicalHistory createSurgicalHistory(PastSurgicalHistory history) {
        return pastSurgicalHistoryRepository.save(history);
    }

    public List<PastSurgicalHistory> getSurgicalHistory(Long patientId) {
        return pastSurgicalHistoryRepository.findByPatientId(patientId);
    }

    @Transactional
    public PersonalHistory createPersonalHistory(PersonalHistory history) {
        return personalHistoryRepository.save(history);
    }

    public List<PersonalHistory> getPersonalHistory(Long patientId) {
        return personalHistoryRepository.findByPatientId(patientId);
    }

    // --- Treatment Operations ---
    @Transactional
    public CurrentTreatment createCurrentTreatment(CurrentTreatment treatment) {
        return currentTreatmentRepository.save(treatment);
    }

    public List<CurrentTreatment> getCurrentTreatment(Long visitId) {
        return currentTreatmentRepository.findByVisitId(visitId);
    }
}
