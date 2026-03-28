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
public class DoctorManagementService {

    private final DoctorFinancialRepository doctorFinancialRepository;
    private final DoctorOperationalRepository doctorOperationalRepository;
    private final DoctorDocumentRepository doctorDocumentRepository;
    private final DoctorServiceMappingRepository doctorServiceMappingRepository;
    private final HospitalRepository hospitalRepository;
    private final UserRepository userRepository;

    @Transactional
    public DoctorFinancial createDoctorFinancial(DoctorFinancial doctorFinancial) {
        Optional<DoctorFinancial> existing = doctorFinancialRepository.findByHospitalIdAndDoctorId(
                doctorFinancial.getHospital().getId(), 
                doctorFinancial.getDoctor().getId()
        );
        if (existing.isPresent()) {
            throw new RuntimeException("Financial setup already exists for this doctor in this hospital");
        }
        return doctorFinancialRepository.save(doctorFinancial);
    }

    public List<DoctorFinancial> getAllDoctorFinancials() {
        return doctorFinancialRepository.findAll();
    }

    public Optional<DoctorFinancial> getDoctorFinancialById(Long id) {
        return doctorFinancialRepository.findById(id);
    }

    @Transactional
    public DoctorFinancial updateDoctorFinancial(Long id, DoctorFinancial doctorFinancial) {
        if (!doctorFinancialRepository.existsById(id)) {
            throw new RuntimeException("Record not found");
        }
        doctorFinancial.setId(id);
        return doctorFinancialRepository.save(doctorFinancial);
    }

    @Transactional
    public void deleteDoctorFinancial(Long id) {
        doctorFinancialRepository.deleteById(id);
    }

    // Similar methods for DoctorOperational, DoctorDocument, and DoctorServiceMapping
    
    @Transactional
    public DoctorOperational createDoctorOperational(DoctorOperational doctorOperational) {
        return doctorOperationalRepository.save(doctorOperational);
    }

    @Transactional
    public DoctorDocument createDoctorDocument(DoctorDocument doctorDocument) {
        return doctorDocumentRepository.save(doctorDocument);
    }

    @Transactional
    public DoctorServiceMapping createDoctorServiceMapping(DoctorServiceMapping mapping) {
        return doctorServiceMappingRepository.save(mapping);
    }
}
