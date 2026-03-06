import mongoose from "mongoose";

const AMCContractSchema = new mongoose.Schema({
  hospitalId: mongoose.Schema.Types.ObjectId,
  branchId: mongoose.Schema.Types.ObjectId,

  equipmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Equipment" },

  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor" },

  startDate: Date,
  endDate: Date,

  contractCost: Number
}, { timestamps: true });

export default mongoose.model("AMCContract", AMCContractSchema);