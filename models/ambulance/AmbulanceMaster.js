// models/ambulance/AmbulanceMaster.js
import mongoose from "mongoose";

const AmbulanceMasterSchema = new mongoose.Schema({
  hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", required: true, index: true },
  branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true, index: true },
  vehicleNumber: { type: String, required: true, unique: true },
  type: { type: String, enum: ["Basic", "Advanced", "ICU"], default: "Basic" },
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Driver
  contactNumber: String,
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model("AmbulanceMaster", AmbulanceMasterSchema);