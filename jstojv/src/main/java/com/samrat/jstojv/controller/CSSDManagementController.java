package com.samrat.jstojv.controller;

import com.samrat.jstojv.entity.*;
import com.samrat.jstojv.service.CSSDManagementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/cssd")
@RequiredArgsConstructor
public class CSSDManagementController {

    private final CSSDManagementService cssdManagementService;

    // Instrument Endpoints
    @PostMapping("/instruments")
    public ResponseEntity<InstrumentMaster> createInstrument(@RequestBody InstrumentMaster instrument) {
        return new ResponseEntity<>(cssdManagementService.createInstrument(instrument), HttpStatus.CREATED);
    }

    @GetMapping("/instruments")
    public ResponseEntity<List<InstrumentMaster>> getAllInstruments() {
        return ResponseEntity.ok(cssdManagementService.getAllInstruments());
    }

    // Batch Endpoints
    @PostMapping("/batches")
    public ResponseEntity<InstrumentBatch> createBatch(@RequestBody InstrumentBatch batch) {
        return new ResponseEntity<>(cssdManagementService.createBatch(batch), HttpStatus.CREATED);
    }

    @GetMapping("/batches")
    public ResponseEntity<List<InstrumentBatch>> getAllBatches() {
        return ResponseEntity.ok(cssdManagementService.getAllBatches());
    }

    // Sterilization Endpoints
    @PostMapping("/sterilization-cycles")
    public ResponseEntity<SterilizationCycle> logSterilizationCycle(@RequestBody SterilizationCycle cycle) {
        return new ResponseEntity<>(cssdManagementService.logSterilizationCycle(cycle), HttpStatus.CREATED);
    }

    // Issue Endpoints
    @PostMapping("/issues")
    public ResponseEntity<InstrumentIssue> issueInstruments(@RequestBody InstrumentIssue issue) {
        return new ResponseEntity<>(cssdManagementService.issueInstruments(issue), HttpStatus.CREATED);
    }
}
