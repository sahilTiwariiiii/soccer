package com.samrat.jstojv.repository;

import com.samrat.jstojv.entity.PharmacyInvoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface PharmacyInvoiceRepository extends JpaRepository<PharmacyInvoice, Long> {
    Optional<PharmacyInvoice> findByInvoiceNumber(String invoiceNumber);
    List<PharmacyInvoice> findByPatientId(Long patientId);
    List<PharmacyInvoice> findByPrescriptionId(Long prescriptionId);
}
