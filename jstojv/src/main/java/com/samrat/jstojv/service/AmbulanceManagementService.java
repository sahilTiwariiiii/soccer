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
public class AmbulanceManagementService {

    private final AmbulanceMasterRepository ambulanceMasterRepository;
    private final AmbulanceTripRepository ambulanceTripRepository;
    private final AmbulanceMaintenanceRepository ambulanceMaintenanceRepository;
    private final AmbulanceAssignmentRepository ambulanceAssignmentRepository;

    // --- Ambulance Master Operations ---
    @Transactional
    public AmbulanceMaster createAmbulance(AmbulanceMaster ambulance) {
        return ambulanceMasterRepository.save(ambulance);
    }

    public List<AmbulanceMaster> getAllAmbulances() {
        return ambulanceMasterRepository.findAll();
    }

    public Optional<AmbulanceMaster> getAmbulanceById(Long id) {
        return ambulanceMasterRepository.findById(id);
    }

    @Transactional
    public AmbulanceMaster updateAmbulance(Long id, AmbulanceMaster ambulance) {
        if (!ambulanceMasterRepository.existsById(id)) {
            throw new RuntimeException("Ambulance not found");
        }
        ambulance.setId(id);
        return ambulanceMasterRepository.save(ambulance);
    }

    @Transactional
    public void deleteAmbulance(Long id) {
        ambulanceMasterRepository.deleteById(id);
    }

    // --- Trip Operations ---
    @Transactional
    public AmbulanceTrip logTrip(AmbulanceTrip trip) {
        // Update ambulance status if needed
        return ambulanceTripRepository.save(trip);
    }

    public List<AmbulanceTrip> getTripHistory(Long ambulanceId) {
        return ambulanceTripRepository.findByAmbulanceId(ambulanceId);
    }

    // --- Maintenance Operations ---
    @Transactional
    public AmbulanceMaintenance logMaintenance(AmbulanceMaintenance maintenance) {
        return ambulanceMaintenanceRepository.save(maintenance);
    }

    // --- Assignment Operations ---
    @Transactional
    public AmbulanceAssignment assignStaff(AmbulanceAssignment assignment) {
        return ambulanceAssignmentRepository.save(assignment);
    }
}
