package com.samrat.jstojv.repository;

import com.samrat.jstojv.entity.AssetMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface AssetMasterRepository extends JpaRepository<AssetMaster, Long> {
    Optional<AssetMaster> findByAssetCode(String assetCode);
    List<AssetMaster> findByHospitalId(Long hospitalId);
    List<AssetMaster> findByBranchId(Long branchId);
}
