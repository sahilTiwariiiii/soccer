import mongoose from "mongoose";

const EquipmentTransferSchema = new mongoose.Schema({
  hospitalId: mongoose.Schema.Types.ObjectId,

  fromBranchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch" },
  toBranchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch" },

  equipmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Equipment" },

  transferDate: Date,
  transferredBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

export default mongoose.model("EquipmentTransfer", EquipmentTransferSchema);