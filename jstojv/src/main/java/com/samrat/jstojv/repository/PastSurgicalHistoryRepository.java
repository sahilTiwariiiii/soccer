package com.samrat.jstojv.repository;

import com.samrat.jstojv.entity.PastSurgicalHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PastSurgicalHistoryRepository extends JpaRepository<PastSurgicalHistory, Long> {
    List<PastSurgicalHistory> findByPatientId(Long patientId);
}
