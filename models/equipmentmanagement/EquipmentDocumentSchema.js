import mongoose from "mongoose";

const EquipmentDocumentSchema = new mongoose.Schema({
  hospitalId: mongoose.Schema.Types.ObjectId,
  branchId: mongoose.Schema.Types.ObjectId,

  equipmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Equipment" },

  documentType: String,
  fileUrl: String
}, { timestamps: true });

export default mongoose.model("EquipmentDocument", EquipmentDocumentSchema);