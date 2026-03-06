import mongoose from "mongoose";

const MaintenanceLogSchema = new mongoose.Schema({
  hospitalId: mongoose.Schema.Types.ObjectId,
  branchId: mongoose.Schema.Types.ObjectId,

  equipmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Equipment" },

  maintenanceDate: Date,
  engineerName: String,

  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor" },

  description: String,
  cost: Number
}, { timestamps: true });

export default mongoose.model("MaintenanceLog", MaintenanceLogSchema);