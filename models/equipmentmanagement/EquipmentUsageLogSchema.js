import mongoose from "mongoose";

const EquipmentUsageLogSchema = new mongoose.Schema({
  hospitalId: mongoose.Schema.Types.ObjectId,
  branchId: mongoose.Schema.Types.ObjectId,

  equipmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Equipment" },

  usedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },

  startTime: Date,
  endTime: Date
}, { timestamps: true });

export default mongoose.model("EquipmentUsageLog", EquipmentUsageLogSchema);