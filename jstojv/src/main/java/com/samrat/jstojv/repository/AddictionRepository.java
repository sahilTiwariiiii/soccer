package com.samrat.jstojv.repository;

import com.samrat.jstojv.entity.Addiction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AddictionRepository extends JpaRepository<Addiction, Long> {
    List<Addiction> findByPatientId(Long patientId);
}
