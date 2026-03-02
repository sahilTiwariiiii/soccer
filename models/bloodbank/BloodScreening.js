// models/BloodScreening.js
import mongoose from "mongoose";

const BloodScreeningSchema = new mongoose.Schema(
  {
    hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", required: true },
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true },

    donationId: { type: mongoose.Schema.Types.ObjectId, ref: "BloodDonation", required: true },

    hiv: Boolean,
    hbsag: Boolean,
    hcv: Boolean,
    malaria: Boolean,
    syphilis: Boolean,

    testedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    testDate: Date,

    status: {
      type: String,
      enum: ["Safe", "Unsafe"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("BloodScreening", BloodScreeningSchema);