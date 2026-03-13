import express from 'express';
import * as inventoryController from '../../controllers/inventory/inventory.controller.js';
const router = express.Router();

router.post('/inventory-items', inventoryController.createInventoryItem);
router.get('/inventory-items', inventoryController.getInventoryItems);
router.post('/stock-transactions', inventoryController.createStockTransaction);

export default router;
