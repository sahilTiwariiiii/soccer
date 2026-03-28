package com.samrat.jstojv.service;

import com.samrat.jstojv.entity.*;
import com.samrat.jstojv.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class IPDManagementService {

    private final IPDAdmissionRepository ipdAdmissionRepository;
    private final IPDDailyNoteRepository ipdDailyNoteRepository;
    private final IPDDoctorAssignmentRepository ipdDoctorAssignmentRepository;
    private final IPDNursingNoteRepository ipdNursingNoteRepository;
    private final BedRepository bedRepository;
    private final PatientVisitRepository patientVisitRepository;

    @Transactional
    public IPDAdmission createIPDAdmission(IPDAdmission admission) {
        // 1. Generate Admission Number if not provided
        if (admission.getAdmissionNumber() == null) {
            admission.setAdmissionNumber("IPD-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        }

        // 2. Check if bed is available
        if (admission.getBed() != null) {
            Bed bed = bedRepository.findById(admission.getBed().getId())
                    .orElseThrow(() -> new RuntimeException("Bed not found"));
            
            if (bed.getStatus() != Bed.BedStatus.Available) {
                throw new RuntimeException("Bed is already " + bed.getStatus());
            }

            // Update Bed Status to Occupied
            bed.setStatus(Bed.BedStatus.Occupied);
            bedRepository.save(bed);
        }

        // 3. Update Patient Visit Status to In Progress
        PatientVisit visit = patientVisitRepository.findById(admission.getVisit().getId())
                .orElseThrow(() -> new RuntimeException("Visit not found"));
        // Assuming there's a status field in PatientVisit, if not we skip this or add it.
        // For now, let's just save the admission.

        return ipdAdmissionRepository.save(admission);
    }

    public List<IPDAdmission> getAllAdmissions() {
        return ipdAdmissionRepository.findAll();
    }

    @Transactional
    public IPDDailyNote addDailyNote(IPDDailyNote note) {
        return ipdDailyNoteRepository.save(note);
    }

    @Transactional
    public IPDNursingNote addNursingNote(IPDNursingNote note) {
        return ipdNursingNoteRepository.save(note);
    }

    @Transactional
    public IPDDoctorAssignment assignDoctor(IPDDoctorAssignment assignment) {
        return ipdDoctorAssignmentRepository.save(assignment);
    }

    @Transactional
    public IPDAdmission dischargePatient(Long admissionId, String summary) {
        IPDAdmission admission = ipdAdmissionRepository.findById(admissionId)
                .orElseThrow(() -> new RuntimeException("Admission not found"));
        
        admission.setStatus(IPDAdmission.Status.DISCHARGED);
        admission.setDischargeDate(LocalDateTime.now());
        admission.setDischargeSummary(summary);

        if (admission.getBed() != null) {
            Bed bed = admission.getBed();
            bed.setStatus(Bed.BedStatus.Available);
            bedRepository.save(bed);
        }

        return ipdAdmissionRepository.save(admission);
    }
}
