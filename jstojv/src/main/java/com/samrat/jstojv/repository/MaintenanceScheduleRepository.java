package com.samrat.jstojv.repository;

import com.samrat.jstojv.entity.MaintenanceSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MaintenanceScheduleRepository extends JpaRepository<MaintenanceSchedule, Long> {
    List<MaintenanceSchedule> findByEquipmentId(Long equipmentId);
    List<MaintenanceSchedule> findByHospitalId(Long hospitalId);
    List<MaintenanceSchedule> findByBranchId(Long branchId);
}
