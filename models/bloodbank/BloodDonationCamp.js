// models/BloodDonationCamp.js
import mongoose from "mongoose";

const BloodDonationCampSchema = new mongoose.Schema(
  {
    hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", required: true },
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true },

    campName: String,
    location: String,
    startDate: Date,
    endDate: Date,

    organizedBy: String,
    doctorInCharge: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("BloodDonationCamp", BloodDonationCampSchema);