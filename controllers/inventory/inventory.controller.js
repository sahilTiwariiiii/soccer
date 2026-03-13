import InventoryItem from '../../models/inventory/InventoryItem.js';
import StockTransaction from '../../models/inventory/StockTransaction.js';

export const createInventoryItem = async (req, res) => {
    try {
        const item = new InventoryItem(req.body);
        await item.save();
        res.status(201).send(item);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getInventoryItems = async (req, res) => {
    try {
        const items = await InventoryItem.find({});
        res.send(items);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const createStockTransaction = async (req, res) => {
    try {
        const transaction = new StockTransaction(req.body);
        await transaction.save();
        // Update inventory item quantity
        const item = await InventoryItem.findById(transaction.item);
        if (transaction.type === 'in') {
            item.quantity += transaction.quantity;
        } else {
            item.quantity -= transaction.quantity;
        }
        await item.save();
        res.status(201).send(transaction);
    } catch (error) {
        res.status(400).send(error);
    }
};
