package com.samrat.jstojv.repository;

import com.samrat.jstojv.entity.DoctorFinancial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface DoctorFinancialRepository extends JpaRepository<DoctorFinancial, Long> {
    Optional<DoctorFinancial> findByHospitalIdAndDoctorId(Long hospitalId, Long doctorId);
}
