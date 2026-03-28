package com.samrat.jstojv.repository;

import com.samrat.jstojv.entity.CurrentTreatment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CurrentTreatmentRepository extends JpaRepository<CurrentTreatment, Long> {
    List<CurrentTreatment> findByVisitId(Long visitId);
}
