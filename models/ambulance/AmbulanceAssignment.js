// models/ambulance/AmbulanceAssignment.js
import mongoose from "mongoose";

const AmbulanceAssignmentSchema = new mongoose.Schema({
  hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", required: true },
  branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true },

  ambulanceId: { type: mongoose.Schema.Types.ObjectId, ref: "AmbulanceMaster", required: true },
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  startTime: { type: Date, required: true },
  endTime: Date,
  status: { type: String, enum: ["Active", "Completed"], default: "Active" },

  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

export default mongoose.model("AmbulanceAssignment", AmbulanceAssignmentSchema);