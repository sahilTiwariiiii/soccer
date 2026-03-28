package com.samrat.jstojv.repository;

import com.samrat.jstojv.entity.AssetMaintenance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AssetMaintenanceRepository extends JpaRepository<AssetMaintenance, Long> {
    List<AssetMaintenance> findByAssetId(Long assetId);
}
