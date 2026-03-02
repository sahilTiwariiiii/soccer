// models/LabSample.js
import mongoose from "mongoose";

const LabSampleSchema = new mongoose.Schema({
  hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", required: true },
  branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true },

  investigationOrderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "InvestigationOrder",
    required: true
  },

  sampleType: { type: String, required: true }, // Blood, Urine
  barcode: { type: String, required: true },

  status: {
    type: String,
    enum: ["Collected", "Received", "Processing", "Completed"],
    default: "Collected"
  },

  collectedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  collectedAt: { type: Date },

  receivedAt: { type: Date },
  processedAt: { type: Date }

}, { timestamps: true });

export default mongoose.model("LabSample", LabSampleSchema);