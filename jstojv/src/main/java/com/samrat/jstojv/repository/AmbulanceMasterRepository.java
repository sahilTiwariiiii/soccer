package com.samrat.jstojv.repository;

import com.samrat.jstojv.entity.AmbulanceMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface AmbulanceMasterRepository extends JpaRepository<AmbulanceMaster, Long> {
    Optional<AmbulanceMaster> findByVehicleNumber(String vehicleNumber);
    List<AmbulanceMaster> findByHospitalId(Long hospitalId);
    List<AmbulanceMaster> findByBranchId(Long branchId);
}
