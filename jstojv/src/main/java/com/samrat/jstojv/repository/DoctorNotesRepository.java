package com.samrat.jstojv.repository;

import com.samrat.jstojv.entity.DoctorNotes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DoctorNotesRepository extends JpaRepository<DoctorNotes, Long> {
    List<DoctorNotes> findByPatientId(Long patientId);
    List<DoctorNotes> findByVisitId(Long visitId);
}
