// models/BloodRequest.js
import mongoose from "mongoose";

const BloodRequestSchema = new mongoose.Schema(
  {
    hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", required: true },
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true },

    patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },

    requestedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    bloodGroup: { type: mongoose.Schema.Types.ObjectId, ref: "BloodGroup" },
    componentType: String,
    quantityUnits: Number,

    status: {
      type: String,
      enum: ["Pending", "Approved", "Issued", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("BloodRequest", BloodRequestSchema);