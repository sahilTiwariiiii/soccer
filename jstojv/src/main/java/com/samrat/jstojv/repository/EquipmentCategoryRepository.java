package com.samrat.jstojv.repository;

import com.samrat.jstojv.entity.EquipmentCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface EquipmentCategoryRepository extends JpaRepository<EquipmentCategory, Long> {
    List<EquipmentCategory> findByHospitalId(Long hospitalId);
    List<EquipmentCategory> findByBranchId(Long branchId);
}
