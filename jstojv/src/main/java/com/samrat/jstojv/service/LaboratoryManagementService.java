package com.samrat.jstojv.service;

import com.samrat.jstojv.entity.*;
import com.samrat.jstojv.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LaboratoryManagementService {

    private final InvestigationMasterRepository investigationMasterRepository;
    private final InvestigationOrderRepository investigationOrderRepository;
    private final LabSampleRepository labSampleRepository;
    private final LabResultRepository labResultRepository;

    // --- Investigation Master Operations ---
    @Transactional
    public InvestigationMaster createInvestigation(InvestigationMaster investigation) {
        return investigationMasterRepository.save(investigation);
    }

    public List<InvestigationMaster> getAllInvestigations() {
        return investigationMasterRepository.findAll();
    }

    // --- Order Operations ---
    @Transactional
    public InvestigationOrder createOrder(InvestigationOrder order) {
        order.setStatus(InvestigationOrder.Status.Pending);
        return investigationOrderRepository.save(order);
    }

    // --- Sample Operations ---
    @Transactional
    public LabSample collectSample(LabSample sample) {
        sample.setStatus(LabSample.Status.Collected);
        sample.setCollectedAt(LocalDateTime.now());
        
        // Update order status
        InvestigationOrder order = investigationOrderRepository.findById(sample.getInvestigationOrder().getId())
                .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setStatus(InvestigationOrder.Status.InProgress);
        investigationOrderRepository.save(order);
        
        return labSampleRepository.save(sample);
    }

    // --- Result Operations ---
    @Transactional
    public LabResult entryResult(LabResult result) {
        result.setResultStatus(LabResult.ResultStatus.Completed);
        
        // Update sample status
        LabSample sample = labSampleRepository.findById(result.getLabSample().getId())
                .orElseThrow(() -> new RuntimeException("Sample not found"));
        sample.setStatus(LabSample.Status.Completed);
        sample.setProcessedAt(LocalDateTime.now());
        labSampleRepository.save(sample);
        
        return labResultRepository.save(result);
    }

    @Transactional
    public LabResult verifyResult(Long resultId, User verifier) {
        LabResult result = labResultRepository.findById(resultId)
                .orElseThrow(() -> new RuntimeException("Result not found"));
        
        result.setResultStatus(LabResult.ResultStatus.Verified);
        result.setVerifiedBy(verifier);
        result.setVerifiedAt(LocalDateTime.now());
        
        // Update order status
        InvestigationOrder order = result.getInvestigationOrder();
        order.setStatus(InvestigationOrder.Status.Completed);
        investigationOrderRepository.save(order);
        
        return labResultRepository.save(result);
    }
}
