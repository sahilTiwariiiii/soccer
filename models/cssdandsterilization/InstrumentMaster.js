// models/CSSD/InstrumentMaster.js
import mongoose from "mongoose";

const InstrumentMasterSchema = new mongoose.Schema({
  hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", required: true, index: true },
  branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true, index: true },
  name: { type: String, required: true },
  category: { type: String }, // e.g., Scissors, Forceps
  code: { type: String, required: true, unique: true },
  isActive: { type: Boolean, default: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

export default mongoose.model("InstrumentMaster", InstrumentMasterSchema);