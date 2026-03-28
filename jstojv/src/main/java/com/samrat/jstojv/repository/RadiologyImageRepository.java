package com.samrat.jstojv.repository;

import com.samrat.jstojv.entity.RadiologyImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RadiologyImageRepository extends JpaRepository<RadiologyImage, Long> {
    List<RadiologyImage> findByRadiologyStudyId(Long radiologyStudyId);
}
