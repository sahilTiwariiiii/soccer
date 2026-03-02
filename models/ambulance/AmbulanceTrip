// models/ambulance/AmbulanceTrip.js
import mongoose from "mongoose";

const AmbulanceTripSchema = new mongoose.Schema({
  hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", required: true, index: true },
  branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true, index: true },

  ambulanceId: { type: mongoose.Schema.Types.ObjectId, ref: "AmbulanceMaster", required: true },
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "PatientRegistration", required: true },
  visitId: { type: mongoose.Schema.Types.ObjectId, ref: "PatientVisit", required: true },

  // Trip Info
  fromLocation: String,
  toLocation: String,
  tripType: { type: String, enum: ["Emergency", "Routine", "Transfer"], default: "Routine" },

  // Time Tracking
  requestedAt: { type: Date, default: Date.now },
  dispatchedAt: Date,
  arrivedAtPatient: Date,
  leftPatient: Date,
  arrivedAtHospital: Date,
  completedAt: Date,

  status: {
    type: String,
    enum: ["Requested", "Dispatched", "OnWay", "Completed", "Cancelled"],
    default: "Requested"
  },

  remarks: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" } // Who created the request
}, { timestamps: true });

export default mongoose.model("AmbulanceTrip", AmbulanceTripSchema);