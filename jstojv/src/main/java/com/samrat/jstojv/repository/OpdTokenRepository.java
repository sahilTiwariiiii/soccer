package com.samrat.jstojv.repository;

import com.samrat.jstojv.entity.OpdToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;

@Repository
public interface OpdTokenRepository extends JpaRepository<OpdToken, Long> {
    long countByRoomIdAndTokenDateBetween(Long roomId, LocalDateTime start, LocalDateTime end);
}
