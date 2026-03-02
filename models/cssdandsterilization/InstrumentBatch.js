// models/CSSD/InstrumentBatch.js
import mongoose from "mongoose";

const InstrumentBatchSchema = new mongoose.Schema({
  hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", required: true, index: true },
  branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true, index: true },
  batchNumber: { type: String, required: true, unique: true },
  instruments: [
    {
      instrumentId: { type: mongoose.Schema.Types.ObjectId, ref: "InstrumentMaster", required: true },
      quantity: { type: Number, required: true, default: 1 },
    }
  ],
  sterilizationDate: Date,
  sterilizationBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // CSSD Staff
  expiryDate: Date,
  status: { type: String, enum: ["Ready", "Used", "Expired"], default: "Ready" },
}, { timestamps: true });

export default mongoose.model("InstrumentBatch", InstrumentBatchSchema);