package com.samrat.jstojv.repository;

import com.samrat.jstojv.entity.BreakdownTicket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BreakdownTicketRepository extends JpaRepository<BreakdownTicket, Long> {
    List<BreakdownTicket> findByEquipmentId(Long equipmentId);
    List<BreakdownTicket> findByHospitalId(Long hospitalId);
    List<BreakdownTicket> findByBranchId(Long branchId);
    List<BreakdownTicket> findByStatus(BreakdownTicket.Status status);
}
