package com.samrat.jstojv.controller;

import com.samrat.jstojv.entity.*;
import com.samrat.jstojv.service.AssetManagementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/asset-management")
@RequiredArgsConstructor
public class AssetManagementController {

    private final AssetManagementService assetManagementService;

    // Asset Master Endpoints
    @PostMapping("/assets")
    public ResponseEntity<AssetMaster> createAsset(@RequestBody AssetMaster asset) {
        return new ResponseEntity<>(assetManagementService.createAsset(asset), HttpStatus.CREATED);
    }

    @GetMapping("/assets")
    public ResponseEntity<List<AssetMaster>> getAllAssets() {
        return ResponseEntity.ok(assetManagementService.getAllAssets());
    }

    @GetMapping("/assets/{id}")
    public ResponseEntity<AssetMaster> getAssetById(@PathVariable Long id) {
        return assetManagementService.getAssetById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/assets/{id}")
    public ResponseEntity<AssetMaster> updateAsset(@PathVariable Long id, @RequestBody AssetMaster asset) {
        return ResponseEntity.ok(assetManagementService.updateAsset(id, asset));
    }

    @DeleteMapping("/assets/{id}")
    public ResponseEntity<Void> deleteAsset(@PathVariable Long id) {
        assetManagementService.deleteAsset(id);
        return ResponseEntity.noContent().build();
    }

    // Category Endpoints
    @PostMapping("/categories")
    public ResponseEntity<AssetCategory> createCategory(@RequestBody AssetCategory category) {
        return new ResponseEntity<>(assetManagementService.createCategory(category), HttpStatus.CREATED);
    }

    @GetMapping("/categories")
    public ResponseEntity<List<AssetCategory>> getAllCategories() {
        return ResponseEntity.ok(assetManagementService.getAllCategories());
    }

    // Assignment Endpoints
    @PostMapping("/assignments")
    public ResponseEntity<AssetAssignment> assignAsset(@RequestBody AssetAssignment assignment) {
        return new ResponseEntity<>(assetManagementService.assignAsset(assignment), HttpStatus.CREATED);
    }

    @GetMapping("/assignments/{assetId}")
    public ResponseEntity<List<AssetAssignment>> getAssetAssignments(@PathVariable Long assetId) {
        return ResponseEntity.ok(assetManagementService.getAssetAssignments(assetId));
    }

    // Maintenance Endpoints
    @PostMapping("/maintenance")
    public ResponseEntity<AssetMaintenance> logMaintenance(@RequestBody AssetMaintenance maintenance) {
        return new ResponseEntity<>(assetManagementService.logMaintenance(maintenance), HttpStatus.CREATED);
    }

    @GetMapping("/maintenance/history/{assetId}")
    public ResponseEntity<List<AssetMaintenance>> getMaintenanceHistory(@PathVariable Long assetId) {
        return ResponseEntity.ok(assetManagementService.getMaintenanceHistory(assetId));
    }
}
