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
public class CoreManagementService {

    private final PatientRegistrationRepository patientRegistrationRepository;
    private final DepartmentRepository departmentRepository;
    private final ProcedureOrderRepository procedureOrderRepository;
    private final HospitalRepository hospitalRepository;
    private final BranchRepository branchRepository;

    // --- Patient Registration Operations ---
    @Transactional
    public PatientRegistration registerPatient(PatientRegistration patient) {
        // Generate UHID logic can be added here
        return patientRegistrationRepository.save(patient);
    }

    public List<PatientRegistration> getAllPatients() {
        return patientRegistrationRepository.findAll();
    }

    public Optional<PatientRegistration> getPatientById(Long id) {
        return patientRegistrationRepository.findById(id);
    }

    // --- Department Operations ---
    @Transactional
    public Department createDepartment(Department department) {
        return departmentRepository.save(department);
    }

    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }

    // --- Procedure Order Operations ---
    @Transactional
    public ProcedureOrder createProcedureOrder(ProcedureOrder order) {
        order.setStatus(ProcedureOrder.Status.Pending);
        return procedureOrderRepository.save(order);
    }

    public List<ProcedureOrder> getPatientProcedures(Long patientId) {
        return procedureOrderRepository.findByPatientId(patientId);
    }
}
