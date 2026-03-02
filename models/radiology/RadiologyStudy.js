// models/RadiologyStudy.js
import mongoose from "mongoose";

const RadiologyStudySchema = new mongoose.Schema({
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

  investigationOrderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "InvestigationOrder",
    required: true
  },

  modality: {
    type: String, // XRay, CT, MRI, USG
    required: true
  },

  status: {
    type: String,
    enum: [
      "Scheduled",
      "Checked-In",
      "In-Progress",
      "Completed",
      "Reported",
      "Verified"
    ],
    default: "Scheduled"
  },

  scheduledAt: Date,
  startedAt: Date,
  completedAt: Date,

  radiologistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  technicianId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }

}, { timestamps: true });

export default mongoose.model("RadiologyStudy", RadiologyStudySchema);