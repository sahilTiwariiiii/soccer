// models/LabResult.js
import mongoose from "mongoose";

const ParameterResultSchema = new mongoose.Schema({
  parameterName: String,
  value: String,
  unit: String,
  normalRange: String,
  isAbnormal: { type: Boolean, default: false }
});

const LabResultSchema = new mongoose.Schema({
  hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", required: true },
  branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true },

  investigationOrderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "InvestigationOrder",
    required: true
  },

  labSampleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LabSample",
    required: true
  },

  parameters: [ParameterResultSchema],

  resultStatus: {
    type: String,
    enum: ["Pending", "Completed", "Verified"],
    default: "Pending"
  },

  verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  verifiedAt: { type: Date }

}, { timestamps: true });

export default mongoose.model("LabResult", LabResultSchema);