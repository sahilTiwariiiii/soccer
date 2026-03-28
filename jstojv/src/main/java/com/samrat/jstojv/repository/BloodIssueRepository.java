package com.samrat.jstojv.repository;

import com.samrat.jstojv.entity.BloodIssue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BloodIssueRepository extends JpaRepository<BloodIssue, Long> {
    List<BloodIssue> findByRequestId(Long requestId);
}
