package com.samrat.jstojv.repository;

import com.samrat.jstojv.entity.PatientRegistration;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PatientRegistrationRepository extends JpaRepository<PatientRegistration, Long> {
    Optional<PatientRegistration> findByUhid(String uhid);
    Optional<PatientRegistration> findByMobile(String mobile);
    Optional<PatientRegistration> findByUhidOrMobile(String uhid, String mobile);

    @Query("SELECT p FROM PatientRegistration p WHERE " +
           "LOWER(p.patientName) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(p.mobile) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(p.uhid) LIKE LOWER(CONCAT('%', :search, '%'))")
    Page<PatientRegistration> searchPatients(@Param("search") String search, Pageable pageable);
}
