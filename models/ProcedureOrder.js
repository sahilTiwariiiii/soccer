// models/ProcedureOrder.js
import mongoose from "mongoose";

const ProcedureOrderSchema = new mongoose.Schema({

  hospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital",
    required: true,
    index: true
  },

  branchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch",
    required: true,
    index: true
  },

  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PatientRegistration",
    required: true,
    index: true
  },

  encounterType: {
    type: String,
    enum: ["OPD", "IPD", "DAYCARE"],
    required: true
  },

  visitId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PatientVisit",
    default: null
  },

  ipdAdmissionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "IPDAdmission",
    default: null
  },

  procedureType: {
    type: String,
    enum: [
      "Dressing",
      "Suturing",
      "Nebulization",
      "Catheterization",
      "Biopsy",
      "Endoscopy",
      "Minor-Surgery",
      "Major-Surgery",
      "Dialysis",
      "Physiotherapy",
      "Vaccination",
      "Other"
    ],
    required: true
  },

  procedureName: {
    type: String,
    required: true
  },

  priority: {
    type: String,
    enum: ["Normal", "Urgent"],
    default: "Normal"
  },

  status: {
    type: String,
    enum: ["Ordered", "In-Progress", "Completed", "Cancelled"],
    default: "Ordered"
  },

  performedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  notes: String,

  performedAt: Date

}, { timestamps: true });

const ProcedureOrder = mongoose.model("ProcedureOrder", ProcedureOrderSchema);

export default ProcedureOrder;