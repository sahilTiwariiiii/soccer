package com.samrat.jstojv.repository;

import com.samrat.jstojv.entity.CertificateType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CertificateTypeRepository extends JpaRepository<CertificateType, Long> {
    List<CertificateType> findByHospitalId(Long hospitalId);
}
