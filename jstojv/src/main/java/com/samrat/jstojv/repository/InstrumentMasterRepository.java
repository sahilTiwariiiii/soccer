package com.samrat.jstojv.repository;

import com.samrat.jstojv.entity.InstrumentMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface InstrumentMasterRepository extends JpaRepository<InstrumentMaster, Long> {
    List<InstrumentMaster> findByHospitalId(Long hospitalId);
}
