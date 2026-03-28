package com.samrat.jstojv.repository;

import com.samrat.jstojv.entity.PatientHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PatientHistoryRepository extends JpaRepository<PatientHistory, Long> {
    List<PatientHistory> findByPatientId(Long patientId);
}
