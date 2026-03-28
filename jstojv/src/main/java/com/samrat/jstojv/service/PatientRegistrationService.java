package com.samrat.jstojv.service;

import com.samrat.jstojv.entity.PatientRegistration;
import com.samrat.jstojv.entity.PatientVisit;
import com.samrat.jstojv.repository.PatientRegistrationRepository;
import com.samrat.jstojv.repository.PatientVisitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PatientRegistrationService {

    @Autowired
    private PatientRegistrationRepository patientRegistrationRepository;

    @Autowired
    private PatientVisitRepository patientVisitRepository;

    public Page<PatientRegistration> getPatients(String search, int page, int limit) {
        // Simple implementation, can be enhanced with search logic
        return patientRegistrationRepository.findAll(PageRequest.of(page - 1, limit));
    }

    public Optional<PatientRegistration> findPatient(String uhid, String mobile) {
        if (uhid != null) {
            return patientRegistrationRepository.findByUhid(uhid);
        }
        if (mobile != null) {
            return patientRegistrationRepository.findByMobile(mobile);
        }
        return Optional.empty();
    }

    public PatientRegistration registerPatient(PatientRegistration patient) {
        if (patientRegistrationRepository.findByUhid(patient.getUhid()).isPresent()) {
            throw new RuntimeException("Patient with this UHID already exists");
        }
        return patientRegistrationRepository.save(patient);
    }

    public List<PatientVisit> listVisits() {
        return patientVisitRepository.findAll();
    }
}
