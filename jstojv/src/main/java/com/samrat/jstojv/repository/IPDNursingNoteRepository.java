package com.samrat.jstojv.repository;

import com.samrat.jstojv.entity.IPDNursingNote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface IPDNursingNoteRepository extends JpaRepository<IPDNursingNote, Long> {
    List<IPDNursingNote> findByIpdAdmissionId(Long ipdAdmissionId);
}
