import mongoose from "mongoose";

const DiagnosisSchema = new mongoose.Schema({
    visitId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PatientVisit",
      required: true
    },
  patientId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "PatientRegistration",
  },
    diagnosisType: {
      type: String,
      enum: ["Provisional", "Final"]
    },
//   'Provisional'  means ex -> ' Doctor fever aur eadache hai toh shayad dengue ho sakta hai '
// 'Final' means  ex 'After all test report me aya ki dengue hai'
    diagnosisName: String,
  
    icdCode: String, //👉 Ye disease ka international medical code hota hai.
  
    notes: String
  
  }, { timestamps: true });
  
  const Diagnosis= mongoose.model("Diagnosis", DiagnosisSchema);
  export default Diagnosis;
  