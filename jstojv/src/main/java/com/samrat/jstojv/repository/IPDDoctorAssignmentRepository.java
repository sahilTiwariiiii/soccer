package com.samrat.jstojv.repository;

import com.samrat.jstojv.entity.IPDDoctorAssignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface IPDDoctorAssignmentRepository extends JpaRepository<IPDDoctorAssignment, Long> {
    List<IPDDoctorAssignment> findByIpdAdmissionId(Long ipdAdmissionId);
}
