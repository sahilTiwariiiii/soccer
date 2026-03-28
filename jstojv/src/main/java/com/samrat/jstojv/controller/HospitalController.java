package com.samrat.jstojv.controller;

import com.samrat.jstojv.entity.Hospital;
import com.samrat.jstojv.repository.HospitalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/hospitals")
public class HospitalController {

    @Autowired
    private HospitalRepository hospitalRepository;

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Hospital hospital) {
        Hospital newHospital = hospitalRepository.save(hospital);
        return ResponseEntity.status(HttpStatus.CREATED).body(newHospital);
    }

    @GetMapping
    public ResponseEntity<?> getAll() {
        List<Hospital> hospitals = hospitalRepository.findAll();
        return ResponseEntity.ok(Map.of("data", hospitals));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        Optional<Hospital> hospital = hospitalRepository.findById(id);
        if (hospital.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Hospital not found"));
        }
        return ResponseEntity.ok(hospital.get());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Hospital hospital) {
        if (!hospitalRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Hospital not found"));
        }
        hospital.setId(id);
        Hospital updatedHospital = hospitalRepository.save(hospital);
        return ResponseEntity.ok(updatedHospital);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        if (!hospitalRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Hospital not found"));
        }
        hospitalRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Hospital deleted successfully"));
    }
}
