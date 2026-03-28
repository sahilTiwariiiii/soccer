package com.samrat.jstojv.repository;

import com.samrat.jstojv.entity.RadiologyReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface RadiologyReportRepository extends JpaRepository<RadiologyReport, Long> {
    Optional<RadiologyReport> findByRadiologyStudyId(Long radiologyStudyId);
}
