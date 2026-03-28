package com.samrat.jstojv.repository;

import com.samrat.jstojv.entity.GlobalVital;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface GlobalVitalRepository extends JpaRepository<GlobalVital, Long> {
    List<GlobalVital> findByDepartmentIdIsNull(); // Global vitals
    List<GlobalVital> findByDepartmentId(Long departmentId);
}
