package com.samrat.jstojv.repository;

import com.samrat.jstojv.entity.BloodRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BloodRequestRepository extends JpaRepository<BloodRequest, Long> {
    List<BloodRequest> findByPatientId(Long patientId);
    List<BloodRequest> findByStatus(BloodRequest.Status status);
}
