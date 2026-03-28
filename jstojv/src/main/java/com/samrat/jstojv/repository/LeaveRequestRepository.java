package com.samrat.jstojv.repository;

import com.samrat.jstojv.entity.LeaveRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface LeaveRequestRepository extends JpaRepository<LeaveRequest, Long> {
    List<LeaveRequest> findByUserId(Long userId);
    List<LeaveRequest> findByHospitalIdAndStatus(Long hospitalId, LeaveRequest.Status status);
}
