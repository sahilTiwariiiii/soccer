const mongoose = require('mongoose');

const bedSchema = new mongoose.Schema({
    ward: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ward',
        required: true
    },
    bedNumber: {
        type: String,
        required: true
    },
    isOccupied: {
        type: Boolean,
        default: false
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    }
}, { timestamps: true });

module.exports = mongoose.model('Bed', bedSchema);
