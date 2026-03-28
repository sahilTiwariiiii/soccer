package com.samrat.jstojv.repository;

import com.samrat.jstojv.entity.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, Long> {
    Optional<Invoice> findByInvoiceNumber(String invoiceNumber);
    List<Invoice> findByPatientId(Long patientId);
    List<Invoice> findByVisitId(Long visitId);
}
