package com.samrat.jstojv.repository;

import com.samrat.jstojv.entity.InvestigationMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface InvestigationMasterRepository extends JpaRepository<InvestigationMaster, Long> {
    List<InvestigationMaster> findByHospitalId(Long hospitalId);
}
