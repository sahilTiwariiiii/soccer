package com.samrat.jstojv.controller;

import com.samrat.jstojv.entity.InventoryItem;
import com.samrat.jstojv.entity.StockTransaction;
import com.samrat.jstojv.service.InventoryManagementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/inventory")
@RequiredArgsConstructor
public class InventoryController {

    private final InventoryManagementService inventoryManagementService;

    @PostMapping("/items")
    public ResponseEntity<InventoryItem> createInventoryItem(@RequestBody InventoryItem item) {
        return new ResponseEntity<>(inventoryManagementService.createInventoryItem(item), HttpStatus.CREATED);
    }

    @GetMapping("/items")
    public ResponseEntity<List<InventoryItem>> getInventoryItems() {
        return ResponseEntity.ok(inventoryManagementService.getAllInventoryItems());
    }

    @PostMapping("/transactions")
    public ResponseEntity<StockTransaction> createStockTransaction(@RequestBody StockTransaction transaction) {
        return new ResponseEntity<>(inventoryManagementService.createStockTransaction(transaction), HttpStatus.CREATED);
    }
}
