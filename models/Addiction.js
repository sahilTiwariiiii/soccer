import mongoose from "mongoose";

const AddictionSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: "PatientRegistration" },
    type: String, // Tobacco, Alcohol
    duration: String,
    units: Number,
    frequency: String,
    createdByUser:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    status: { type: String, enum: ["Ongoing", "Stopped"] }
  }, { timestamps: true });
  
  export default mongoose.model("Addiction", AddictionSchema);
  