package com.samrat.jstojv.controller;

import com.samrat.jstojv.entity.*;
import com.samrat.jstojv.service.EquipmentManagementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/equipment-management")
@RequiredArgsConstructor
public class EquipmentManagementController {

    private final EquipmentManagementService equipmentManagementService;

    // Equipment Endpoints
    @PostMapping("/equipment")
    public ResponseEntity<Equipment> createEquipment(@RequestBody Equipment equipment) {
        return new ResponseEntity<>(equipmentManagementService.createEquipment(equipment), HttpStatus.CREATED);
    }

    @GetMapping("/equipment")
    public ResponseEntity<List<Equipment>> getAllEquipment() {
        return ResponseEntity.ok(equipmentManagementService.getAllEquipment());
    }

    @GetMapping("/equipment/{id}")
    public ResponseEntity<Equipment> getEquipmentById(@PathVariable Long id) {
        return equipmentManagementService.getEquipmentById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/equipment/{id}")
    public ResponseEntity<Equipment> updateEquipment(@PathVariable Long id, @RequestBody Equipment equipment) {
        return ResponseEntity.ok(equipmentManagementService.updateEquipment(id, equipment));
    }

    @DeleteMapping("/equipment/{id}")
    public ResponseEntity<Void> deleteEquipment(@PathVariable Long id) {
        equipmentManagementService.deleteEquipment(id);
        return ResponseEntity.noContent().build();
    }

    // Category Endpoints
    @PostMapping("/categories")
    public ResponseEntity<EquipmentCategory> createCategory(@RequestBody EquipmentCategory category) {
        return new ResponseEntity<>(equipmentManagementService.createCategory(category), HttpStatus.CREATED);
    }

    @GetMapping("/categories")
    public ResponseEntity<List<EquipmentCategory>> getAllCategories() {
        return ResponseEntity.ok(equipmentManagementService.getAllCategories());
    }

    // Maintenance Endpoints
    @PostMapping("/maintenance-logs")
    public ResponseEntity<MaintenanceLog> logMaintenance(@RequestBody MaintenanceLog log) {
        return new ResponseEntity<>(equipmentManagementService.logMaintenance(log), HttpStatus.CREATED);
    }

    @GetMapping("/maintenance-history/{equipmentId}")
    public ResponseEntity<List<MaintenanceLog>> getMaintenanceHistory(@PathVariable Long equipmentId) {
        return ResponseEntity.ok(equipmentManagementService.getMaintenanceHistory(equipmentId));
    }

    // Breakdown Ticket Endpoints
    @PostMapping("/breakdown-tickets")
    public ResponseEntity<BreakdownTicket> createBreakdownTicket(@RequestBody BreakdownTicket ticket) {
        return new ResponseEntity<>(equipmentManagementService.createBreakdownTicket(ticket), HttpStatus.CREATED);
    }

    @PostMapping("/breakdown-tickets/{id}/resolve")
    public ResponseEntity<BreakdownTicket> resolveBreakdownTicket(@PathVariable Long id, @RequestBody String resolutionNotes) {
        return ResponseEntity.ok(equipmentManagementService.resolveBreakdownTicket(id, resolutionNotes));
    }

    @GetMapping("/breakdown-tickets/open")
    public ResponseEntity<List<BreakdownTicket>> getOpenBreakdownTickets() {
        return ResponseEntity.ok(equipmentManagementService.getOpenBreakdownTickets());
    }
}
