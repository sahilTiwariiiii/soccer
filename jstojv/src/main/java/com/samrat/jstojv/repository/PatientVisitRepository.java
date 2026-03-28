package com.samrat.jstojv.repository;

import com.samrat.jstojv.entity.PatientVisit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PatientVisitRepository extends JpaRepository<PatientVisit, Long> {
    List<PatientVisit> findByPatientId(Long patientId);
    List<PatientVisit> findByDoctorId(Long doctorId);
    List<PatientVisit> findByBranchId(Long branchId);
}
