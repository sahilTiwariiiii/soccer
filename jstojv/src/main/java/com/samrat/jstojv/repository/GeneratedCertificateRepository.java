package com.samrat.jstojv.repository;

import com.samrat.jstojv.entity.GeneratedCertificate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface GeneratedCertificateRepository extends JpaRepository<GeneratedCertificate, Long> {
    Optional<GeneratedCertificate> findByCertificateNumber(String certificateNumber);
    List<GeneratedCertificate> findByPatientId(Long patientId);
}
