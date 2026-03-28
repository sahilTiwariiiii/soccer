package com.samrat.jstojv.repository;

import com.samrat.jstojv.entity.Pharmacy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PharmacyRepository extends JpaRepository<Pharmacy, Long> {
    List<Pharmacy> findByBranchId(Long branchId);
}
