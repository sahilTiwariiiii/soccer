import mongoose from "mongoose";

const CurrentTreatmentSchema = new mongoose.Schema(
  {
    visitId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PatientVisit",
      required: true
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PatientRegistration",
      required: true
    },
    medicines: {
      type: [Object],
      default: []
    },
    pharmacyNotes: {
      type: String
    },
    refills: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

const CurrentTreatment = mongoose.model("CurrentTreatment", CurrentTreatmentSchema);
export default CurrentTreatment;

