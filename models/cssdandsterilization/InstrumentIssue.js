// models/CSSD/InstrumentIssue.js
import mongoose from "mongoose";

const InstrumentIssueSchema = new mongoose.Schema({
  hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", required: true, index: true },
  branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true, index: true },
  batchId: { type: mongoose.Schema.Types.ObjectId, ref: "InstrumentBatch", required: true },
  issuedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Doctor or nurse
  issuedFor: { type: String, enum: ["Surgery", "IPD", "OPD"], default: "Surgery" },
  issuedQuantity: { type: Number, required: true },
  issuedAt: { type: Date, default: Date.now },
  returnedAt: Date,
  returnedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: { type: String, enum: ["Issued", "Returned"], default: "Issued" }
}, { timestamps: true });

export default mongoose.model("InstrumentIssue", InstrumentIssueSchema);