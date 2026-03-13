import mongoose from "mongoose";

const PrescriptionSchema = new mongoose.Schema({

  hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", required: true },
  branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true },

  visitId: { type: mongoose.Schema.Types.ObjectId, ref: "PatientVisit", required: true },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "PatientRegistration", required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  status: {
    type: String,
    enum: [
      "Pending",
      "SentToPharmacy",
      "PartiallyDispensed",
      "Dispensed",
      "Cancelled"
    ],
    default: "Pending"
  },

  notesForPharmacy: String,
  cancellationReason: String,

  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }

}, { timestamps: true });

export default mongoose.model("PrescriptionHeader", PrescriptionSchema);