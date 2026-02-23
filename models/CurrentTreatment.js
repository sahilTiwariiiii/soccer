import mongoose from "mongoose";

const MedicineSchema = new mongoose.Schema({
  medicineName: { type: String, required: true },
  form: { type: String, enum: ["Tablet","Capsule","Syrup","Injection"], default: "Tablet" },
  dosage: { type: String, required: true },        // e.g., "500mg"
  frequency: { type: String, required: true },     // e.g., "Twice a day"
  duration: { type: String, required: true },      // e.g., "5 days"
  route: { type: String, enum: ["Oral","IV","IM","Subcutaneous"], default: "Oral" },
  instructions: String,                             // Optional extra instructions
  status: { type: String, enum: ["Active","Discontinued","Completed"], default: "Active" }
});

const CurrentTreatmentPrecriptionSchema = new mongoose.Schema({
  visitId: { type: mongoose.Schema.Types.ObjectId, ref: "PatientVisit", required: true },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "PatientRegistration", required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  medicines: [MedicineSchema],                      // Array of medicines
  pharmacyNotes: String,                            // Optional notes for pharmacy
  refills: { type: Number, default: 0 }            // Optional refill count
}, { timestamps: true });

const CurrentTreatment= mongoose.model("CurrentTreatment", CurrentTreatmentPrecriptionSchema);
export default CurrentTreatment; 