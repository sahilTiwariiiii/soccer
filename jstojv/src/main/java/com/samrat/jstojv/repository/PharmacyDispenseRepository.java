package com.samrat.jstojv.repository;

import com.samrat.jstojv.entity.PharmacyDispense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PharmacyDispenseRepository extends JpaRepository<PharmacyDispense, Long> {
    List<PharmacyDispense> findByPrescriptionId(Long prescriptionId);
    List<PharmacyDispense> findByPrescriptionItemId(Long prescriptionItemId);
}
