package com.samrat.jstojv.repository;

import com.samrat.jstojv.entity.VisitVital;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface VisitVitalRepository extends JpaRepository<VisitVital, Long> {
    Optional<VisitVital> findByVisitId(Long visitId);
}
