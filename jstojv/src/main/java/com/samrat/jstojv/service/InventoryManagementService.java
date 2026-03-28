package com.samrat.jstojv.service;

import com.samrat.jstojv.entity.InventoryItem;
import com.samrat.jstojv.entity.StockTransaction;
import com.samrat.jstojv.repository.InventoryItemRepository;
import com.samrat.jstojv.repository.StockTransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class InventoryManagementService {

    private final InventoryItemRepository inventoryItemRepository;
    private final StockTransactionRepository stockTransactionRepository;

    @Transactional
    public InventoryItem createInventoryItem(InventoryItem item) {
        return inventoryItemRepository.save(item);
    }

    public List<InventoryItem> getAllInventoryItems() {
        return inventoryItemRepository.findAll();
    }

    @Transactional
    public StockTransaction createStockTransaction(StockTransaction transaction) {
        StockTransaction newTransaction = stockTransactionRepository.save(transaction);
        
        InventoryItem item = inventoryItemRepository.findById(transaction.getItem().getId())
                .orElseThrow(() -> new RuntimeException("Item not found"));
        
        if (transaction.getType() == StockTransaction.TransactionType.in) {
            item.setQuantity(item.getQuantity() + transaction.getQuantity());
        } else {
            if (item.getQuantity() < transaction.getQuantity()) {
                throw new RuntimeException("Insufficient stock");
            }
            item.setQuantity(item.getQuantity() - transaction.getQuantity());
        }
        inventoryItemRepository.save(item);
        
        return newTransaction;
    }
}
