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
public class EquipmentManagementService {

    private final EquipmentRepository equipmentRepository;
    private final EquipmentCategoryRepository equipmentCategoryRepository;
    private final EquipmentVendorRepository equipmentVendorRepository;
    private final EquipmentDepartmentRepository equipmentDepartmentRepository;
    private final EquipmentLocationRepository equipmentLocationRepository;
    private final MaintenanceLogRepository maintenanceLogRepository;
    private final MaintenanceScheduleRepository maintenanceScheduleRepository;
    private final BreakdownTicketRepository breakdownTicketRepository;

    // --- Equipment Operations ---
    @Transactional
    public Equipment createEquipment(Equipment equipment) {
        return equipmentRepository.save(equipment);
    }

    public List<Equipment> getAllEquipment() {
        return equipmentRepository.findAll();
    }

    public Optional<Equipment> getEquipmentById(Long id) {
        return equipmentRepository.findById(id);
    }

    @Transactional
    public Equipment updateEquipment(Long id, Equipment equipment) {
        if (!equipmentRepository.existsById(id)) {
            throw new RuntimeException("Equipment not found");
        }
        equipment.setId(id);
        return equipmentRepository.save(equipment);
    }

    @Transactional
    public void deleteEquipment(Long id) {
        equipmentRepository.deleteById(id);
    }

    // --- Category Operations ---
    @Transactional
    public EquipmentCategory createCategory(EquipmentCategory category) {
        return equipmentCategoryRepository.save(category);
    }

    public List<EquipmentCategory> getAllCategories() {
        return equipmentCategoryRepository.findAll();
    }

    // --- Maintenance Operations ---
    @Transactional
    public MaintenanceLog logMaintenance(MaintenanceLog log) {
        // Update equipment status if needed
        return maintenanceLogRepository.save(log);
    }

    public List<MaintenanceLog> getMaintenanceHistory(Long equipmentId) {
        return maintenanceLogRepository.findByEquipmentId(equipmentId);
    }

    // --- Breakdown Ticket Operations ---
    @Transactional
    public BreakdownTicket createBreakdownTicket(BreakdownTicket ticket) {
        // Update equipment status to 'broken'
        Equipment equipment = equipmentRepository.findById(ticket.getEquipment().getId())
                .orElseThrow(() -> new RuntimeException("Equipment not found"));
        equipment.setStatus(Equipment.Status.broken);
        equipmentRepository.save(equipment);
        
        return breakdownTicketRepository.save(ticket);
    }

    @Transactional
    public BreakdownTicket resolveBreakdownTicket(Long ticketId, String resolutionNotes) {
        BreakdownTicket ticket = breakdownTicketRepository.findById(ticketId)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));
        
        ticket.setStatus(BreakdownTicket.Status.resolved);
        // Assuming there might be resolution notes, we can add them to a log or a field if added.
        
        Equipment equipment = ticket.getEquipment();
        equipment.setStatus(Equipment.Status.active);
        equipmentRepository.save(equipment);
        
        return breakdownTicketRepository.save(ticket);
    }

    public List<BreakdownTicket> getOpenBreakdownTickets() {
        return breakdownTicketRepository.findByStatus(BreakdownTicket.Status.open);
    }
}
