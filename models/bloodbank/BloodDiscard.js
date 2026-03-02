// models/BloodDiscard.js
import mongoose from "mongoose";

const BloodDiscardSchema = new mongoose.Schema(
  {
    hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", required: true },
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true },

    componentId: { type: mongoose.Schema.Types.ObjectId, ref: "BloodComponent", required: true },

    reason: String,
    discardedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    discardDate: Date,
  },
  { timestamps: true }
);

export default mongoose.model("BloodDiscard", BloodDiscardSchema);