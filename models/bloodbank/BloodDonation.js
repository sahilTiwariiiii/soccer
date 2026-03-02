// models/BloodDonation.js
import mongoose from "mongoose";

const BloodDonationSchema = new mongoose.Schema(
  {
    hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", required: true },
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true },

    donationNumber: { type: String, required: true, unique: true },

    donorId: { type: mongoose.Schema.Types.ObjectId, ref: "BloodDonor", required: true },
    campId: { type: mongoose.Schema.Types.ObjectId, ref: "BloodDonationCamp" },

    donationDate: { type: Date, required: true },
    collectedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    bloodGroup: { type: mongoose.Schema.Types.ObjectId, ref: "BloodGroup" },

    quantityML: { type: Number, default: 450 },

    bagNumber: { type: String, required: true },

    status: {
      type: String,
      enum: ["Collected", "Tested", "Separated", "Discarded"],
      default: "Collected",
    },
  },
  { timestamps: true }
);

export default mongoose.model("BloodDonation", BloodDonationSchema);