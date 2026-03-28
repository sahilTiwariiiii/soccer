package com.samrat.jstojv.repository;

import com.samrat.jstojv.entity.Bed;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BedRepository extends JpaRepository<Bed, Long> {
    List<Bed> findByBranchId(Long branchId);
    List<Bed> findByRoomId(Long roomId);
    List<Bed> findByStatus(Bed.BedStatus status);
}
