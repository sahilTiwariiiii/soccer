package com.samrat.jstojv.repository;

import com.samrat.jstojv.entity.LabSample;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface LabSampleRepository extends JpaRepository<LabSample, Long> {
    List<LabSample> findByInvestigationOrderId(Long investigationOrderId);
    List<LabSample> findByStatus(LabSample.Status status);
}
