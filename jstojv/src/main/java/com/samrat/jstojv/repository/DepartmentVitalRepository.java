package com.samrat.jstojv.repository;

import com.samrat.jstojv.entity.DepartmentVital;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DepartmentVitalRepository extends JpaRepository<DepartmentVital, Long> {
    List<DepartmentVital> findByDepartmentIdOrderByDisplayOrderAsc(Long departmentId);
}
