package com.samrat.jstojv.repository;

import com.samrat.jstojv.entity.BloodInventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BloodInventoryRepository extends JpaRepository<BloodInventory, Long> {
    List<BloodInventory> findByBloodGroupId(Long bloodGroupId);
    List<BloodInventory> findByStatus(BloodInventory.Status status);
}
