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
public class VitalsManagementService {

    private final GlobalVitalRepository globalVitalRepository;
    private final DepartmentVitalRepository departmentVitalRepository;
    private final VisitVitalRepository visitVitalRepository;

    // --- Vital Definition Operations ---
    @Transactional
    public GlobalVital createGlobalVital(GlobalVital vital) {
        return globalVitalRepository.save(vital);
    }

    public List<GlobalVital> getGlobalVitals() {
        return globalVitalRepository.findByDepartmentIdIsNull();
    }

    @Transactional
    public DepartmentVital mapVitalToDepartment(DepartmentVital departmentVital) {
        return departmentVitalRepository.save(departmentVital);
    }

    public List<DepartmentVital> getVitalsByDepartment(Long departmentId) {
        return departmentVitalRepository.findByDepartmentIdOrderByDisplayOrderAsc(departmentId);
    }

    // --- Visit Vitals Operations ---
    @Transactional
    public VisitVital recordVisitVitals(VisitVital visitVital) {
        return visitVitalRepository.save(visitVital);
    }

    public Optional<VisitVital> getVitalsByVisit(Long visitId) {
        return visitVitalRepository.findByVisitId(visitId);
    }
}
