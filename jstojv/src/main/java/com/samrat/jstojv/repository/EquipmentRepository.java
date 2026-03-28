package com.samrat.jstojv.repository;

import com.samrat.jstojv.entity.Equipment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface EquipmentRepository extends JpaRepository<Equipment, Long> {
    Optional<Equipment> findByEquipmentCode(String equipmentCode);
    List<Equipment> findByHospitalId(Long hospitalId);
    List<Equipment> findByBranchId(Long branchId);
    List<Equipment> findByDepartmentId(Long departmentId);
}
