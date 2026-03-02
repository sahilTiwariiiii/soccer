// models/CSSD/SterilizationCycle.js
import mongoose from "mongoose";

const SterilizationCycleSchema = new mongoose.Schema({
  hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", required: true },
  branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true },
  batchId: { type: mongoose.Schema.Types.ObjectId, ref: "InstrumentBatch", required: true },
  cycleNumber: { type: Number, required: true },
  startTime: { type: Date, default: Date.now },
  endTime: Date,
  performedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  machineUsed: String,
  status: { type: String, enum: ["Pending", "Completed", "Failed"], default: "Pending" }
}, { timestamps: true });

export default mongoose.model("SterilizationCycle", SterilizationCycleSchema);