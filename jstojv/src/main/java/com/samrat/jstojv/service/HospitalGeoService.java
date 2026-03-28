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
public class HospitalGeoService {

    private final HospitalRepository hospitalRepository;
    private final BranchRepository branchRepository;
    private final CityRepository cityRepository;
    private final StateRepository stateRepository;
    private final CountryRepository countryRepository;

    // --- Hospital and Branch Operations ---
    @Transactional
    public Hospital createHospital(Hospital hospital) {
        return hospitalRepository.save(hospital);
    }

    public List<Hospital> getAllHospitals() {
        return hospitalRepository.findAll();
    }

    @Transactional
    public Branch createBranch(Branch branch) {
        return branchRepository.save(branch);
    }

    public List<Branch> getBranchesByHospital(Long hospitalId) {
        return branchRepository.findByHospitalId(hospitalId);
    }

    // --- Geo Operations ---
    public List<Country> getAllCountries() {
        return countryRepository.findAll();
    }

    public List<State> getStatesByCountry(Long countryId) {
        return stateRepository.findByCountryId(countryId);
    }

    public List<City> getCitiesByState(Long stateId) {
        return cityRepository.findByStateId(stateId);
    }
}
