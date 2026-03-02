// models/RadiologyReport.js
import mongoose from "mongoose";

const RadiologyReportSchema = new mongoose.Schema({
  hospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital",
    required: true
  },
  branchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch",
    required: true
  },

  radiologyStudyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RadiologyStudy",
    required: true
  },

  findings: String,
  impression: String,

  reportStatus: {
    type: String,
    enum: ["Draft", "Final", "Verified"],
    default: "Draft"
  },

  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  verifiedAt: Date

}, { timestamps: true });

export default mongoose.model("RadiologyReport", RadiologyReportSchema);