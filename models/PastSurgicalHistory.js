import mongoose from "mongoose";

const PastSurgicalHistorySchema = mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: "PatientRegistration" },
    surgeryName: String,
    surgeryDate: Date,
    surgeonName: String,
    hospital: String,
    createdByUser:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
  }, { timestamps: true });
  
  const PastSurgicalHistory= mongoose.model("PastSurgicalHistory", PastSurgicalHistorySchema);

  export default PastSurgicalHistory;