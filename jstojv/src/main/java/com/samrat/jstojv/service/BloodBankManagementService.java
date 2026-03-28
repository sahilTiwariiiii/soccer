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
public class BloodBankManagementService {

    private final BloodDonorRepository bloodDonorRepository;
    private final BloodInventoryRepository bloodInventoryRepository;
    private final BloodRequestRepository bloodRequestRepository;
    private final BloodGroupRepository bloodGroupRepository;
    private final BloodDonationRepository bloodDonationRepository;
    private final BloodIssueRepository bloodIssueRepository;

    // --- Donor Operations ---
    @Transactional
    public BloodDonor registerDonor(BloodDonor donor) {
        return bloodDonorRepository.save(donor);
    }

    public List<BloodDonor> getAllDonors() {
        return bloodDonorRepository.findAll();
    }

    // --- Donation Operations ---
    @Transactional
    public BloodDonation logDonation(BloodDonation donation) {
        // Log donation and add to inventory
        donation = bloodDonationRepository.save(donation);
        
        BloodInventory inventory = BloodInventory.builder()
                .hospital(donation.getHospital())
                .branch(donation.getBranch())
                .bloodGroup(donation.getBloodGroup())
                .bagNumber(donation.getBagNumber())
                .volume(donation.getVolume())
                .collectionDate(donation.getDonationDate())
                .expiryDate(donation.getExpiryDate())
                .status(BloodInventory.Status.Available)
                .build();
        bloodInventoryRepository.save(inventory);
        
        return donation;
    }

    // --- Request and Issue Operations ---
    @Transactional
    public BloodRequest createBloodRequest(BloodRequest request) {
        return bloodRequestRepository.save(request);
    }

    @Transactional
    public BloodIssue issueBlood(BloodIssue issue) {
        // Check inventory
        BloodInventory inventory = bloodInventoryRepository.findById(issue.getBloodInventory().getId())
                .orElseThrow(() -> new RuntimeException("Blood unit not found"));
        
        if (inventory.getStatus() != BloodInventory.Status.Available) {
            throw new RuntimeException("Blood unit not available for issue");
        }
        
        // Update inventory status
        inventory.setStatus(BloodInventory.Status.Issued);
        bloodInventoryRepository.save(inventory);
        
        // Update request status
        BloodRequest request = bloodRequestRepository.findById(issue.getBloodRequest().getId())
                .orElseThrow(() -> new RuntimeException("Blood request not found"));
        request.setStatus(BloodRequest.Status.Issued);
        bloodRequestRepository.save(request);
        
        return bloodIssueRepository.save(issue);
    }

    public List<BloodInventory> getAvailableBloodUnits() {
        return bloodInventoryRepository.findByStatus(BloodInventory.Status.Available);
    }
}
