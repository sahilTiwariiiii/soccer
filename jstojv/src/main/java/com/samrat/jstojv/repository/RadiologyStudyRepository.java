package com.samrat.jstojv.repository;

import com.samrat.jstojv.entity.RadiologyStudy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RadiologyStudyRepository extends JpaRepository<RadiologyStudy, Long> {
    List<RadiologyStudy> findByInvestigationOrderId(Long investigationOrderId);
    List<RadiologyStudy> findByStatus(RadiologyStudy.Status status);
}
