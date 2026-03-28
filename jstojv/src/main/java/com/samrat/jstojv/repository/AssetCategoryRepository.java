package com.samrat.jstojv.repository;

import com.samrat.jstojv.entity.AssetCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssetCategoryRepository extends JpaRepository<AssetCategory, Long> {
}
