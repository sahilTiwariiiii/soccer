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
public class PharmacyService {

    private final PharmacyRepository pharmacyRepository;
    private final MedicineMasterRepository medicineMasterRepository;
    private final SupplierRepository supplierRepository;
    private final PharmacyStockRepository pharmacyStockRepository;
    private final PrescriptionHeaderRepository prescriptionHeaderRepository;
    private final PrescriptionItemRepository prescriptionItemRepository;
    private final PharmacyInvoiceRepository pharmacyInvoiceRepository;
    private final PharmacyDispenseRepository pharmacyDispenseRepository;

    @Transactional
    public Pharmacy createPharmacy(Pharmacy pharmacy) {
        return pharmacyRepository.save(pharmacy);
    }

    public List<Pharmacy> getAllPharmacies() {
        return pharmacyRepository.findAll();
    }

    @Transactional
    public MedicineMaster createMedicine(MedicineMaster medicine) {
        return medicineMasterRepository.save(medicine);
    }

    public List<MedicineMaster> getAllMedicines() {
        return medicineMasterRepository.findAll();
    }

    @Transactional
    public PharmacyStock updateStock(PharmacyStock stock) {
        return pharmacyStockRepository.save(stock);
    }

    public List<PharmacyStock> getStockByPharmacy(Long pharmacyId) {
        return pharmacyStockRepository.findByPharmacyId(pharmacyId);
    }

    @Transactional
    public PharmacyInvoice createInvoice(PharmacyInvoice invoice) {
        return pharmacyInvoiceRepository.save(invoice);
    }

    @Transactional
    public PharmacyDispense dispenseMedicine(PharmacyDispense dispense) {
        // Update stock quantity
        PharmacyStock stock = pharmacyStockRepository.findById(dispense.getStock().getId())
                .orElseThrow(() -> new RuntimeException("Stock not found"));
        
        if (stock.getAvailableQuantity() < dispense.getQuantityGiven()) {
            throw new RuntimeException("Insufficient stock");
        }
        
        stock.setAvailableQuantity(stock.getAvailableQuantity() - dispense.getQuantityGiven());
        pharmacyStockRepository.save(stock);
        
        // Update prescription item status
        PrescriptionItem item = prescriptionItemRepository.findById(dispense.getPrescriptionItem().getId())
                .orElseThrow(() -> new RuntimeException("Prescription item not found"));
        
        item.setQuantityDispensed(item.getQuantityDispensed() + dispense.getQuantityGiven());
        if (item.getQuantityDispensed() >= item.getQuantityPrescribed()) {
            item.setItemStatus(PrescriptionItem.ItemStatus.Dispensed);
        } else {
            item.setItemStatus(PrescriptionItem.ItemStatus.PartiallyDispensed);
        }
        prescriptionItemRepository.save(item);
        
        return pharmacyDispenseRepository.save(dispense);
    }
}
