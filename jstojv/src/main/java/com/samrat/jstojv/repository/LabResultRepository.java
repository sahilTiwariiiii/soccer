package com.samrat.jstojv.repository;

import com.samrat.jstojv.entity.LabResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface LabResultRepository extends JpaRepository<LabResult, Long> {
    Optional<LabResult> findByLabSampleId(Long labSampleId);
    Optional<LabResult> findByInvestigationOrderId(Long investigationOrderId);
}
