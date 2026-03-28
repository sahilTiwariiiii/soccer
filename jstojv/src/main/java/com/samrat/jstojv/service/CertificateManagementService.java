package com.samrat.jstojv.service;

import com.samrat.jstojv.entity.*;
import com.samrat.jstojv.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CertificateManagementService {

    private final CertificateTemplateRepository templateRepository;
    private final CertificateTypeRepository typeRepository;
    private final GeneratedCertificateRepository generatedCertificateRepository;

    // --- Template Operations ---
    @Transactional
    public CertificateTemplate createTemplate(CertificateTemplate template) {
        return templateRepository.save(template);
    }

    public List<CertificateTemplate> getAllTemplates() {
        return templateRepository.findAll();
    }

    // --- Type Operations ---
    @Transactional
    public CertificateType createType(CertificateType type) {
        return typeRepository.save(type);
    }

    public List<CertificateType> getAllTypes() {
        return typeRepository.findAll();
    }

    // --- Generation Operations ---
    @Transactional
    public GeneratedCertificate generateCertificate(GeneratedCertificate certificate) {
        if (certificate.getCertificateNumber() == null) {
            certificate.setCertificateNumber("CERT-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        }
        certificate.setStatus(GeneratedCertificate.Status.issued);
        return generatedCertificateRepository.save(certificate);
    }

    public Optional<GeneratedCertificate> verifyCertificate(String certificateNumber) {
        return generatedCertificateRepository.findByCertificateNumber(certificateNumber);
    }
}
