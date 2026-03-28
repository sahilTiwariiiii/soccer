package com.samrat.jstojv.repository;

import com.samrat.jstojv.entity.ProcedureOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProcedureOrderRepository extends JpaRepository<ProcedureOrder, Long> {
    List<ProcedureOrder> findByPatientId(Long patientId);
    List<ProcedureOrder> findByVisitId(Long visitId);
    List<ProcedureOrder> findByStatus(ProcedureOrder.Status status);
}
