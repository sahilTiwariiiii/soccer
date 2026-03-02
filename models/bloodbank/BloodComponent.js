// models/BloodComponent.js
import mongoose from "mongoose";

const BloodComponentSchema = new mongoose.Schema(
  {
    hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", required: true },
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true },

    donationId: { type: mongoose.Schema.Types.ObjectId, ref: "BloodDonation", required: true },

    componentType: {
      type: String,
      enum: ["Whole Blood", "PRBC", "Platelets", "FFP", "Cryoprecipitate"],
    },

    quantityML: Number,

    expiryDate: Date,

    status: {
      type: String,
      enum: ["Available", "Reserved", "Issued", "Expired", "Discarded"],
      default: "Available",
    },
  },
  { timestamps: true }
);

export default mongoose.model("BloodComponent", BloodComponentSchema);