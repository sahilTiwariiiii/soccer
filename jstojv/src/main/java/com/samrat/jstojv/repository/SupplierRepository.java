package com.samrat.jstojv.repository;

import com.samrat.jstojv.entity.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SupplierRepository extends JpaRepository<Supplier, Long> {
    List<Supplier> findByHospitalId(Long hospitalId);
    List<Supplier> findByBranchId(Long branchId);
}
