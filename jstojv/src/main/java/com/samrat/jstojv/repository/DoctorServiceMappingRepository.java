package com.samrat.jstojv.repository;

import com.samrat.jstojv.entity.DoctorServiceMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface DoctorServiceMappingRepository extends JpaRepository<DoctorServiceMapping, Long> {
    Optional<DoctorServiceMapping> findByHospitalIdAndDoctorId(Long hospitalId, Long doctorId);
}
