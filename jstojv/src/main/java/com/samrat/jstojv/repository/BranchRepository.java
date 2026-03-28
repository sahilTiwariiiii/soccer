package com.samrat.jstojv.repository;

import com.samrat.jstojv.entity.Branch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BranchRepository extends JpaRepository<Branch, Long> {
    List<Branch> findByHospitalId(Long hospitalId);
}
