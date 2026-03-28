package com.samrat.jstojv.repository;

import com.samrat.jstojv.entity.InstrumentIssue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface InstrumentIssueRepository extends JpaRepository<InstrumentIssue, Long> {
    List<InstrumentIssue> findByBatchId(Long batchId);
}
