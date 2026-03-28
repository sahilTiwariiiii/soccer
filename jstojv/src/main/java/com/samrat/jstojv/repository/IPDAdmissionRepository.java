package com.samrat.jstojv.repository;

import com.samrat.jstojv.entity.IPDAdmission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface IPDAdmissionRepository extends JpaRepository<IPDAdmission, Long> {
    Optional<IPDAdmission> findByAdmissionNumber(String admissionNumber);
    List<IPDAdmission> findByPatientId(Long patientId);
    List<IPDAdmission> findByStatus(IPDAdmission.Status status);
}
