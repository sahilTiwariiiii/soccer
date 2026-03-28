package com.samrat.jstojv.controller;

import com.samrat.jstojv.entity.*;
import com.samrat.jstojv.service.PharmacyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/pharmacy")
@RequiredArgsConstructor
public class PharmacyController {

    private final PharmacyService pharmacyService;

    @PostMapping
    public ResponseEntity<Pharmacy> createPharmacy(@RequestBody Pharmacy pharmacy) {
        return new ResponseEntity<>(pharmacyService.createPharmacy(pharmacy), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Pharmacy>> getAllPharmacies() {
        return ResponseEntity.ok(pharmacyService.getAllPharmacies());
    }

    @PostMapping("/medicines")
    public ResponseEntity<MedicineMaster> createMedicine(@RequestBody MedicineMaster medicine) {
        return new ResponseEntity<>(pharmacyService.createMedicine(medicine), HttpStatus.CREATED);
    }

    @GetMapping("/medicines")
    public ResponseEntity<List<MedicineMaster>> getAllMedicines() {
        return ResponseEntity.ok(pharmacyService.getAllMedicines());
    }

    @PostMapping("/dispense")
    public ResponseEntity<PharmacyDispense> dispenseMedicine(@RequestBody PharmacyDispense dispense) {
        return new ResponseEntity<>(pharmacyService.dispenseMedicine(dispense), HttpStatus.CREATED);
    }

    @GetMapping("/stock/{pharmacyId}")
    public ResponseEntity<List<PharmacyStock>> getStock(@PathVariable Long pharmacyId) {
        return ResponseEntity.ok(pharmacyService.getStockByPharmacy(pharmacyId));
    }
}
