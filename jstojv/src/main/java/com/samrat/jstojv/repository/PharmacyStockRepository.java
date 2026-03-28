package com.samrat.jstojv.repository;

import com.samrat.jstojv.entity.PharmacyStock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface PharmacyStockRepository extends JpaRepository<PharmacyStock, Long> {
    List<PharmacyStock> findByPharmacyId(Long pharmacyId);
    List<PharmacyStock> findByMedicineId(Long medicineId);
    Optional<PharmacyStock> findByPharmacyIdAndMedicineIdAndBatchNumber(Long pharmacyId, Long medicineId, String batchNumber);
}
