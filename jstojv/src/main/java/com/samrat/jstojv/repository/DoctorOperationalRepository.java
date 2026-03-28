package com.samrat.jstojv.repository;

import com.samrat.jstojv.entity.DoctorOperational;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface DoctorOperationalRepository extends JpaRepository<DoctorOperational, Long> {
    Optional<DoctorOperational> findByHospitalIdAndDoctorId(Long hospitalId, Long doctorId);
}
