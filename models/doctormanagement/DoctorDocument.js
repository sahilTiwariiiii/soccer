const DoctorDocumentSchema = new mongoose.Schema({
    hospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true
    },
  
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true
    },
  
    documents: [{
      documentType: String,
      fileUrl: String,
      uploadedAt: Date
    }],
  
    digitalSignatureUrl: String
  
  }, { timestamps: true });
  
  export const DoctorDocument =
    mongoose.model("DoctorDocument", DoctorDocumentSchema);