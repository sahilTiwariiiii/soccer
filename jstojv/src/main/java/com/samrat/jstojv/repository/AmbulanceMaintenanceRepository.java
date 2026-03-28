package com.samrat.jstojv.repository;

import com.samrat.jstojv.entity.AmbulanceMaintenance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AmbulanceMaintenanceRepository extends JpaRepository<AmbulanceMaintenance, Long> {
    List<AmbulanceMaintenance> findByAmbulanceId(Long ambulanceId);
}
