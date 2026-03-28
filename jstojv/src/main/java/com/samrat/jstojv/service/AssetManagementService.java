package com.samrat.jstojv.service;

import com.samrat.jstojv.entity.*;
import com.samrat.jstojv.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AssetManagementService {

    private final AssetMasterRepository assetMasterRepository;
    private final AssetCategoryRepository assetCategoryRepository;
    private final AssetAssignmentRepository assetAssignmentRepository;
    private final AssetMaintenanceRepository assetMaintenanceRepository;
    private final AssetLocationRepository assetLocationRepository;
    private final AssetVendorRepository assetVendorRepository;

    // --- Asset Master Operations ---
    @Transactional
    public AssetMaster createAsset(AssetMaster asset) {
        return assetMasterRepository.save(asset);
    }

    public List<AssetMaster> getAllAssets() {
        return assetMasterRepository.findAll();
    }

    public Optional<AssetMaster> getAssetById(Long id) {
        return assetMasterRepository.findById(id);
    }

    @Transactional
    public AssetMaster updateAsset(Long id, AssetMaster asset) {
        if (!assetMasterRepository.existsById(id)) {
            throw new RuntimeException("Asset not found");
        }
        asset.setId(id);
        return assetMasterRepository.save(asset);
    }

    @Transactional
    public void deleteAsset(Long id) {
        assetMasterRepository.deleteById(id);
    }

    // --- Category Operations ---
    @Transactional
    public AssetCategory createCategory(AssetCategory category) {
        return assetCategoryRepository.save(category);
    }

    public List<AssetCategory> getAllCategories() {
        return assetCategoryRepository.findAll();
    }

    // --- Assignment Operations ---
    @Transactional
    public AssetAssignment assignAsset(AssetAssignment assignment) {
        return assetAssignmentRepository.save(assignment);
    }

    public List<AssetAssignment> getAssetAssignments(Long assetId) {
        return assetAssignmentRepository.findByAssetId(assetId);
    }

    // --- Maintenance Operations ---
    @Transactional
    public AssetMaintenance logMaintenance(AssetMaintenance maintenance) {
        return assetMaintenanceRepository.save(maintenance);
    }

    public List<AssetMaintenance> getMaintenanceHistory(Long assetId) {
        return assetMaintenanceRepository.findByAssetId(assetId);
    }
}
