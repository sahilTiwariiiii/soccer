package com.samrat.jstojv.repository;

import com.samrat.jstojv.entity.DoctorDocument;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface DoctorDocumentRepository extends JpaRepository<DoctorDocument, Long> {
    Optional<DoctorDocument> findByHospitalIdAndDoctorId(Long hospitalId, Long doctorId);
}
