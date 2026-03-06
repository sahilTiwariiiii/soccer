import mongoose from "mongoose";

const EquipmentStatusHistorySchema = new mongoose.Schema({
  hospitalId: mongoose.Schema.Types.ObjectId,
  branchId: mongoose.Schema.Types.ObjectId,

  equipmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Equipment" },

  status: String,
  changedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  remarks: String
}, { timestamps: true });

export default mongoose.model("EquipmentStatusHistory", EquipmentStatusHistorySchema);