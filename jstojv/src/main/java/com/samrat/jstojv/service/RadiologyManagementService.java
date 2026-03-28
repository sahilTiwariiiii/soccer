package com.samrat.jstojv.service;

import com.samrat.jstojv.entity.*;
import com.samrat.jstojv.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RadiologyManagementService {

    private final RadiologyStudyRepository radiologyStudyRepository;
    private final RadiologyImageRepository radiologyImageRepository;
    private final RadiologyReportRepository radiologyReportRepository;

    // --- Study Operations ---
    @Transactional
    public RadiologyStudy createStudy(RadiologyStudy study) {
        return radiologyStudyRepository.save(study);
    }

    public List<RadiologyStudy> getStudiesByStatus(RadiologyStudy.Status status) {
        return radiologyStudyRepository.findByStatus(status);
    }

    // --- Image Operations ---
    @Transactional
    public RadiologyImage uploadImage(RadiologyImage image) {
        return radiologyImageRepository.save(image);
    }

    public List<RadiologyImage> getImagesByStudy(Long studyId) {
        return radiologyImageRepository.findByRadiologyStudyId(studyId);
    }

    // --- Report Operations ---
    @Transactional
    public RadiologyReport saveReport(RadiologyReport report) {
        // Update study status to Reported
        RadiologyStudy study = radiologyStudyRepository.findById(report.getRadiologyStudy().getId())
                .orElseThrow(() -> new RuntimeException("Study not found"));
        study.setStatus(RadiologyStudy.Status.Reported);
        radiologyStudyRepository.save(study);
        
        return radiologyReportRepository.save(report);
    }

    @Transactional
    public RadiologyReport verifyReport(Long reportId, User verifier) {
        RadiologyReport report = radiologyReportRepository.findById(reportId)
                .orElseThrow(() -> new RuntimeException("Report not found"));
        
        report.setReportStatus(RadiologyReport.ReportStatus.Verified);
        report.setVerifiedBy(verifier);
        report.setVerifiedAt(java.time.LocalDateTime.now());
        
        RadiologyStudy study = report.getRadiologyStudy();
        study.setStatus(RadiologyStudy.Status.Verified);
        radiologyStudyRepository.save(study);
        
        return radiologyReportRepository.save(report);
    }
}
