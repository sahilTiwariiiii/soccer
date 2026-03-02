// models/ambulance/AmbulanceMaintenance.js
import mongoose from "mongoose";

const AmbulanceMaintenanceSchema = new mongoose.Schema({
  hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", required: true },
  branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true },

  ambulanceId: { type: mongoose.Schema.Types.ObjectId, ref: "AmbulanceMaster", required: true },
  maintenanceDate: { type: Date, default: Date.now },
  type: { type: String, enum: ["Routine", "Repair", "Accident"], default: "Routine" },
  description: String,
  cost: Number,
  performedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" } // Staff who performed or recorded
}, { timestamps: true });

export default mongoose.model("AmbulanceMaintenance", AmbulanceMaintenanceSchema);