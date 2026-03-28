package com.samrat.jstojv.repository;

import com.samrat.jstojv.entity.PastMedicalHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PastMedicalHistoryRepository extends JpaRepository<PastMedicalHistory, Long> {
    List<PastMedicalHistory> findByPatientId(Long patientId);
}
