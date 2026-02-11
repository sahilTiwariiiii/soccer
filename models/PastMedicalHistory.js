import mongoose from "mongoose";

const PastMedicalHistorySchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: "PatientRegistration" },
    disease: String,
    duration: String,
    medication: String,
    createdByUser:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
  }, { timestamps: true });
  
  const PastMedicalHistory= mongoose.model("PastMedicalHistory", PastMedicalHistorySchema);
  export default PastMedicalHistory;
  