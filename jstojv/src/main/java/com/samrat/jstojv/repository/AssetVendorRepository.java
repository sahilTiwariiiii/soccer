package com.samrat.jstojv.repository;

import com.samrat.jstojv.entity.AssetVendor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssetVendorRepository extends JpaRepository<AssetVendor, Long> {
}
