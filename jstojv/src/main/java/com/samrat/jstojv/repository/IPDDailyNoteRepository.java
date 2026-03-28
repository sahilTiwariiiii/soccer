package com.samrat.jstojv.repository;

import com.samrat.jstojv.entity.IPDDailyNote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface IPDDailyNoteRepository extends JpaRepository<IPDDailyNote, Long> {
    List<IPDDailyNote> findByIpdAdmissionId(Long ipdAdmissionId);
}
