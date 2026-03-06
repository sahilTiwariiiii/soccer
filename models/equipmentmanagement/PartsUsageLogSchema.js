import mongoose from "mongoose";

const PartsUsageLogSchema = new mongoose.Schema({
  hospitalId: mongoose.Schema.Types.ObjectId,
  branchId: mongoose.Schema.Types.ObjectId,

  equipmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Equipment" },

  sparePartId: { type: mongoose.Schema.Types.ObjectId, ref: "SparePart" },

  quantityUsed: Number,

  usedInMaintenanceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MaintenanceLog"
  }
}, { timestamps: true });

export default mongoose.model("PartsUsageLog", PartsUsageLogSchema);