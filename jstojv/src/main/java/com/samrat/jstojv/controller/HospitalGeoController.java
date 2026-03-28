package com.samrat.jstojv.controller;

import com.samrat.jstojv.entity.*;
import com.samrat.jstojv.service.HospitalGeoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/hospital-geo")
@RequiredArgsConstructor
public class HospitalGeoController {

    private final HospitalGeoService hospitalGeoService;

    // Hospital and Branch Endpoints
    @PostMapping("/hospitals")
    public ResponseEntity<Hospital> createHospital(@RequestBody Hospital hospital) {
        return new ResponseEntity<>(hospitalGeoService.createHospital(hospital), HttpStatus.CREATED);
    }

    @GetMapping("/hospitals")
    public ResponseEntity<List<Hospital>> getAllHospitals() {
        return ResponseEntity.ok(hospitalGeoService.getAllHospitals());
    }

    @PostMapping("/branches")
    public ResponseEntity<Branch> createBranch(@RequestBody Branch branch) {
        return new ResponseEntity<>(hospitalGeoService.createBranch(branch), HttpStatus.CREATED);
    }

    @GetMapping("/branches/{hospitalId}")
    public ResponseEntity<List<Branch>> getBranchesByHospital(@PathVariable Long hospitalId) {
        return ResponseEntity.ok(hospitalGeoService.getBranchesByHospital(hospitalId));
    }

    // Geo Endpoints
    @GetMapping("/countries")
    public ResponseEntity<List<Country>> getAllCountries() {
        return ResponseEntity.ok(hospitalGeoService.getAllCountries());
    }

    @GetMapping("/states/{countryId}")
    public ResponseEntity<List<State>> getStatesByCountry(@PathVariable Long countryId) {
        return ResponseEntity.ok(hospitalGeoService.getStatesByCountry(countryId));
    }

    @GetMapping("/cities/{stateId}")
    public ResponseEntity<List<City>> getCitiesByState(@PathVariable Long stateId) {
        return ResponseEntity.ok(hospitalGeoService.getCitiesByState(stateId));
    }
}
