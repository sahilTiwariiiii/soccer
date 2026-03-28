package com.samrat.jstojv.repository;

import com.samrat.jstojv.entity.MedicineMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MedicineMasterRepository extends JpaRepository<MedicineMaster, Long> {
    List<MedicineMaster> findByHospitalId(Long hospitalId);
}
