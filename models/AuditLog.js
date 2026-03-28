import mongoose from 'mongoose';

const AuditLogSchema = new mongoose.Schema({
    hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital', required: true },
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', required: true },
    timestamp: { type: Date, default: Date.now },
    user: {
        name: String,
        role: String,
        id: mongoose.Schema.Types.ObjectId
    },
    action: { type: String, required: true }, // e.g., CREATE, UPDATE, DELETE, LOGIN
    module: { type: String, required: true }, // e.g., Pharmacy, IPD, Billing
    description: String,
    ipAddress: String,
    severity: { type: String, enum: ['info', 'warning', 'error', 'critical'], default: 'info' },
    details: Object
}, { timestamps: true });

export default mongoose.model('AuditLog', AuditLogSchema);
