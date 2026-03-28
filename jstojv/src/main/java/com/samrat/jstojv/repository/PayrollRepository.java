package com.samrat.jstojv.repository;

import com.samrat.jstojv.entity.Payroll;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface PayrollRepository extends JpaRepository<Payroll, Long> {
    Optional<Payroll> findByUserIdAndMonthAndYear(Long userId, Integer month, Integer year);
    List<Payroll> findByHospitalIdAndMonthAndYear(Long hospitalId, Integer month, Integer year);
}
