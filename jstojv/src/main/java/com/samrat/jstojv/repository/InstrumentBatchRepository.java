package com.samrat.jstojv.repository;

import com.samrat.jstojv.entity.InstrumentBatch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface InstrumentBatchRepository extends JpaRepository<InstrumentBatch, Long> {
    Optional<InstrumentBatch> findByBatchNumber(String batchNumber);
    List<InstrumentBatch> findByHospitalId(Long hospitalId);
    List<InstrumentBatch> findByBranchId(Long branchId);
}
