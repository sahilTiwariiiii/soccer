package com.samrat.jstojv.repository;

import com.samrat.jstojv.entity.PersonalHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PersonalHistoryRepository extends JpaRepository<PersonalHistory, Long> {
    List<PersonalHistory> findByPatientId(Long patientId);
}
