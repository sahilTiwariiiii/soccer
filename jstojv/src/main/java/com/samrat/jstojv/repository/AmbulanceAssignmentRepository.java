package com.samrat.jstojv.repository;

import com.samrat.jstojv.entity.AmbulanceAssignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AmbulanceAssignmentRepository extends JpaRepository<AmbulanceAssignment, Long> {
    List<AmbulanceAssignment> findByAmbulanceId(Long ambulanceId);
}
