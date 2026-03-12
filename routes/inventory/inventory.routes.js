const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventory/inventory.controller');

router.post('/inventory-items', inventoryController.createInventoryItem);
router.get('/inventory-items', inventoryController.getInventoryItems);
router.post('/stock-transactions', inventoryController.createStockTransaction);

module.exports = router;
