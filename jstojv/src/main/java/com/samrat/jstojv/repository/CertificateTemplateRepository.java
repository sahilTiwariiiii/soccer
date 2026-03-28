package com.samrat.jstojv.repository;

import com.samrat.jstojv.entity.CertificateTemplate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CertificateTemplateRepository extends JpaRepository<CertificateTemplate, Long> {
    List<CertificateTemplate> findByHospitalId(Long hospitalId);
}
