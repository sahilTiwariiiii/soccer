package com.samrat.jstojv.repository;

import com.samrat.jstojv.entity.AmbulanceTrip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AmbulanceTripRepository extends JpaRepository<AmbulanceTrip, Long> {
    List<AmbulanceTrip> findByAmbulanceId(Long ambulanceId);
    List<AmbulanceTrip> findByHospitalId(Long hospitalId);
    List<AmbulanceTrip> findByBranchId(Long branchId);
}
