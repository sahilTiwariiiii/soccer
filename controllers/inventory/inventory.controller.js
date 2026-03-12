const InventoryItem = require('../models/inventory/InventoryItem');
const StockTransaction = require('../models/inventory/StockTransaction');

exports.createInventoryItem = async (req, res) => {
    try {
        const item = new InventoryItem(req.body);
        await item.save();
        res.status(201).send(item);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.getInventoryItems = async (req, res) => {
    try {
        const items = await InventoryItem.find({});
        res.send(items);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.createStockTransaction = async (req, res) => {
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
