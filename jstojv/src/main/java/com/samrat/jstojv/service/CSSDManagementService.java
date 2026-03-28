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
public class CSSDManagementService {

    private final InstrumentMasterRepository instrumentMasterRepository;
    private final InstrumentBatchRepository instrumentBatchRepository;
    private final InstrumentIssueRepository instrumentIssueRepository;
    private final SterilizationCycleRepository sterilizationCycleRepository;

    // --- Instrument Master Operations ---
    @Transactional
    public InstrumentMaster createInstrument(InstrumentMaster instrument) {
        return instrumentMasterRepository.save(instrument);
    }

    public List<InstrumentMaster> getAllInstruments() {
        return instrumentMasterRepository.findAll();
    }

    // --- Batch Operations ---
    @Transactional
    public InstrumentBatch createBatch(InstrumentBatch batch) {
        return instrumentBatchRepository.save(batch);
    }

    public List<InstrumentBatch> getAllBatches() {
        return instrumentBatchRepository.findAll();
    }

    // --- Sterilization Operations ---
    @Transactional
    public SterilizationCycle logSterilizationCycle(SterilizationCycle cycle) {
        // Update batch status to Ready
        InstrumentBatch batch = instrumentBatchRepository.findById(cycle.getBatch().getId())
                .orElseThrow(() -> new RuntimeException("Batch not found"));
        batch.setStatus(InstrumentBatch.Status.Ready);
        instrumentBatchRepository.save(batch);
        
        return sterilizationCycleRepository.save(cycle);
    }

    // --- Issue Operations ---
    @Transactional
    public InstrumentIssue issueInstruments(InstrumentIssue issue) {
        // Check batch status
        InstrumentBatch batch = instrumentBatchRepository.findById(issue.getBatch().getId())
                .orElseThrow(() -> new RuntimeException("Batch not found"));
        
        if (batch.getStatus() != InstrumentBatch.Status.Ready) {
            throw new RuntimeException("Batch not ready for issue");
        }
        
        // Update batch status
        batch.setStatus(InstrumentBatch.Status.Used);
        instrumentBatchRepository.save(batch);
        
        return instrumentIssueRepository.save(issue);
    }
}
