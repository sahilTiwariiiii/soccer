// models/BloodInventory.js
import mongoose from "mongoose";

const BloodInventorySchema = new mongoose.Schema(
  {
    hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", required: true },
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true },

    componentId: { type: mongoose.Schema.Types.ObjectId, ref: "BloodComponent", required: true },

    bloodGroup: { type: mongoose.Schema.Types.ObjectId, ref: "BloodGroup" },

    currentStatus: {
      type: String,
      enum: ["Available", "Reserved", "Issued", "Expired", "Discarded"],
      default: "Available",
    },
  },
  { timestamps: true }
);

export default mongoose.model("BloodInventory", BloodInventorySchema);