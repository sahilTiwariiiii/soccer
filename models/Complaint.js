const ComplaintSchema = new mongoose.Schema({
    visitId: { type: mongoose.Schema.Types.ObjectId, ref: "PatientVisit" },
    complaints: [String],
    createdByUser:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
  }, { timestamps: true });
  
  const Complaint= mongoose.model("Complaint", ComplaintSchema);
  export default Complaint;
  