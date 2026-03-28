package com.samrat.jstojv.repository;

import com.samrat.jstojv.entity.EquipmentLocation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface EquipmentLocationRepository extends JpaRepository<EquipmentLocation, Long> {
    List<EquipmentLocation> findByHospitalId(Long hospitalId);
    List<EquipmentLocation> findByBranchId(Long branchId);
}
