package com.samrat.jstojv.repository;

import com.samrat.jstojv.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    List<Room> findByBranchId(Long branchId);
    List<Room> findByFloorId(Long floorId);
}
