import mongoose from "mongoose";

const PatientVisitSchema = new mongoose.Schema({

  /* ===== LINKS ===== */
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PatientRegistration",
    required: true
  },

  uhid: {
    type: String,
    index: true
  },

  /* ===== VISIT CORE ===== */
  visitDate: {
    type: Date,
    required: true
  },

  visitTime: {
    type: String,
    required: true
  },

  visitType: {
    type: String,
    enum: ["OPD", "IPD", "Emergency"],
    required: true
  },

  /* ===== FLOW TRACKING (VERY IMPORTANT) ===== */
  status: {
    type: String,
    enum: [
      "Arrived",      // registration done
      "Waiting",      // waiting for doctor / test / bed
      "In Progress",  // consultation / test / OT
      "Completed"     // visit finished / discharge
    ],
    default: "Arrived"
  },

  /* ===== WHERE & WHO ===== */
  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: true
  },
  departmentName: {
    type: String,
  },

  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor"
  },

  slot: {
    type: String,
    enum: ["Slot I", "Slot II", "Slot III"]
  },

  /* ===== MONEY (VISIT LEVEL ONLY) ===== */
  fee: Number,
  paymentMode: {
    type: String,
    enum: ["Cash", "Card", "UPI", "Insurance"]
  },
   receiptNo:{
    type:String,
    required:true
   },
  /* ===== OPTIONAL NOTES ===== */
  remark: String

}, { timestamps: true });
const PatientVisit= mongoose.model("PatientVisit", PatientVisitSchema);
export default PatientVisit;
