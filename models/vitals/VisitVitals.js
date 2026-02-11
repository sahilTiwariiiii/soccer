import mongoose from "mongoose";

const VisitVitalsSchema = new mongoose.Schema(
  {
    visitId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PatientVisit",
      required: true,
      unique: true,
    },
    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },

    vitals: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
      default: {},
    },

    recordedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const VisitVitals= mongoose.model("VisitVitals", VisitVitalsSchema);
export default VisitVitals;
