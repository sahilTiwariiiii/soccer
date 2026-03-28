package com.samrat.jstojv.repository;

import com.samrat.jstojv.entity.SterilizationCycle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SterilizationCycleRepository extends JpaRepository<SterilizationCycle, Long> {
    List<SterilizationCycle> findByBatchId(Long batchId);
}
