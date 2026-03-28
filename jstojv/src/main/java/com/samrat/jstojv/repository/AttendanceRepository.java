package com.samrat.jstojv.repository;

import com.samrat.jstojv.entity.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    List<Attendance> findByUserIdAndDateBetween(Long userId, LocalDateTime startDate, LocalDateTime endDate);
    List<Attendance> findByHospitalIdAndDateBetween(Long hospitalId, LocalDateTime startDate, LocalDateTime endDate);
}
