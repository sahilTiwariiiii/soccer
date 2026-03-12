const mongoose = require('mongoose');

const inventoryItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    },
    unit: {
        type: String,
        required: true
    },
    supplier: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('InventoryItem', inventoryItemSchema);
