package com.samrat.jstojv.repository;

import com.samrat.jstojv.entity.BloodDonation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BloodDonationRepository extends JpaRepository<BloodDonation, Long> {
    List<BloodDonation> findByDonorId(Long donorId);
}
