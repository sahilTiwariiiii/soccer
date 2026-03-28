package com.samrat.jstojv.repository;

import com.samrat.jstojv.entity.EquipmentVendor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface EquipmentVendorRepository extends JpaRepository<EquipmentVendor, Long> {
    List<EquipmentVendor> findByHospitalId(Long hospitalId);
    List<EquipmentVendor> findByBranchId(Long branchId);
}
