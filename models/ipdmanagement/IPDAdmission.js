// models/IPDAdmission.js
import mongoose from "mongoose";

const IPDAdmissionSchema = new mongoose.Schema(
  {
    hospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
      index: true,
    },
    branchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
      index: true,
    },

    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PatientRegistration",
      required: true,
    },

    visitId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PatientVisit",
      required: true,
    },

    admissionNumber: { type: String, required: true },

    admissionDate: { type: Date, default: Date.now },

    bedId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bed", // from Branch module
    },

    treatingDoctors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Doctor inside Users collection
      },
    ],

    status: {
      type: String,
      enum: ["ADMITTED", "DISCHARGED"],
      default: "ADMITTED",
    },

    dischargeDate: Date,
    dischargeSummary: String,
  },
  { timestamps: true }
);

export default mongoose.model("IPDAdmission", IPDAdmissionSchema);