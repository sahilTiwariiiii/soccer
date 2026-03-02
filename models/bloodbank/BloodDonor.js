// models/BloodDonor.js
import mongoose from "mongoose";

const BloodDonorSchema = new mongoose.Schema(
  {
    hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", required: true },
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true },

    donorId: { type: String, required: true, unique: true },

    firstName: String,
    lastName: String,
    gender: String,
    dob: Date,
    phone: String,
    email: String,
    address: String,

    bloodGroup: { type: mongoose.Schema.Types.ObjectId, ref: "BloodGroup" },

    weight: Number,
    hemoglobin: Number,

    lastDonationDate: Date,
    totalDonations: { type: Number, default: 0 },

    status: {
      type: String,
      enum: ["Active", "Deferred", "Blacklisted"],
      default: "Active",
    },
  },
  { timestamps: true }
);

export default mongoose.model("BloodDonor", BloodDonorSchema);