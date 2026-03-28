package com.samrat.jstojv.repository;

import com.samrat.jstojv.entity.EquipmentDepartment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface EquipmentDepartmentRepository extends JpaRepository<EquipmentDepartment, Long> {
    List<EquipmentDepartment> findByHospitalId(Long hospitalId);
    List<EquipmentDepartment> findByBranchId(Long branchId);
}
