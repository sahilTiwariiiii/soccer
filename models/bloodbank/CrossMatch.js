// models/CrossMatch.js
import mongoose from "mongoose";

const CrossMatchSchema = new mongoose.Schema(
  {
    hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", required: true },
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true },

    requestId: { type: mongoose.Schema.Types.ObjectId, ref: "BloodRequest", required: true },
    componentId: { type: mongoose.Schema.Types.ObjectId, ref: "BloodComponent", required: true },

    result: {
      type: String,
      enum: ["Compatible", "Incompatible"],
    },

    performedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    performedAt: Date,
  },
  { timestamps: true }
);

export default mongoose.model("CrossMatch", CrossMatchSchema);