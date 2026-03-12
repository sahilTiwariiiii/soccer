const mongoose = require('mongoose');

const stockTransactionSchema = new mongoose.Schema({
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'InventoryItem',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ['in', 'out'],
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('StockTransaction', stockTransactionSchema);
