package com.samrat.jstojv.repository;

import com.samrat.jstojv.entity.PrescriptionHeader;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PrescriptionHeaderRepository extends JpaRepository<PrescriptionHeader, Long> {
    List<PrescriptionHeader> findByPatientId(Long patientId);
    List<PrescriptionHeader> findByVisitId(Long visitId);
    List<PrescriptionHeader> findByDoctorId(Long doctorId);
}
