import mongoose from "mongoose";

const DoctorNotesSchema = new mongoose.Schema({
  visitId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PatientVisit",
    required: true
  },

  userId: {   // Doctor (User model se)
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  subjective: String,  // patient statement
  objective: String,   // examination findings
  assessment: String,  // clinical reasoning
  plan: String         // treatment plan

}, { timestamps: true });

const DoctorNotes= mongoose.model("DoctorNotes", DoctorNotesSchema);
export default DoctorNotes;