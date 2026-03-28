package com.samrat.jstojv.repository;

import com.samrat.jstojv.entity.AssetAssignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AssetAssignmentRepository extends JpaRepository<AssetAssignment, Long> {
    List<AssetAssignment> findByAssetId(Long assetId);
    List<AssetAssignment> findByAssignedToStaffId(Long staffId);
}
