package com.samrat.jstojv.repository;

import com.samrat.jstojv.entity.InvestigationOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface InvestigationOrderRepository extends JpaRepository<InvestigationOrder, Long> {
    List<InvestigationOrder> findByPatientId(Long patientId);
    List<InvestigationOrder> findByVisitId(Long visitId);
    List<InvestigationOrder> findByStatus(InvestigationOrder.Status status);
}
