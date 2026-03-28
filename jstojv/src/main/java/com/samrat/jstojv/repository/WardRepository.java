package com.samrat.jstojv.repository;

import com.samrat.jstojv.entity.Ward;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface WardRepository extends JpaRepository<Ward, Long> {
    List<Ward> findByHospitalId(Long hospitalId);
    List<Ward> findByBranchId(Long branchId);
}
