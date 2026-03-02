// models/IPDDoctorAssignment.js
import mongoose from "mongoose";

const IPDDoctorAssignmentSchema = new mongoose.Schema(
  {
    hospitalId: { type: mongoose.Schema.Types.ObjectId, required: true },
    branchId: { type: mongoose.Schema.Types.ObjectId, required: true },

    ipdAdmissionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "IPDAdmission",
      required: true
    },

    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    role: {
      type: String,
      enum: ["Primary", "Consultant", "Surgeon"],
      default: "Primary"
    }
  },
  { timestamps: true }
);

export default mongoose.model("IPDDoctorAssignment", IPDDoctorAssignmentSchema);