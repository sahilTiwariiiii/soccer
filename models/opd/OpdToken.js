import mongoose from "mongoose";
const OpdTokenSchema = new mongoose.Schema({
  hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", required: true },
  branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true },
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "PatientRegistration", required: true },
  visitId: { type: mongoose.Schema.Types.ObjectId, ref: "PatientVisit", required: true },
  tokenDate: { type: Date, required: true },
  tokenNumber: { type: Number, required: true },
  priority: { type: String, enum: ["Normal", "Urgent"], default: "Normal" },
  status: { type: String, enum: ["Waiting", "Called", "In-Consultation", "Completed", "No-Show", "Cancelled"], default: "Waiting" },
  calledAt: { type: Date },
  completedAt: { type: Date }
}, { timestamps: true });
export default mongoose.model("OpdToken", OpdTokenSchema);
