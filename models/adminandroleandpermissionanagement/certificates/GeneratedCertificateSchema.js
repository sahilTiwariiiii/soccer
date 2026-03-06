const GeneratedCertificateSchema = new mongoose.Schema({

    hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", required: true },
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true },
  
    certificateNumber: { type: String, unique: true },
  
    certificateTypeId: { type: mongoose.Schema.Types.ObjectId, ref: "CertificateType" },
  
    templateId: { type: mongoose.Schema.Types.ObjectId, ref: "CertificateTemplate" },
  
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
  
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
  
    filledData: Object, // dynamic values
  
    issueDate: { type: Date, default: Date.now },
  
    status: {
      type: String,
      enum: ["draft", "issued", "cancelled"]
    },
  
    pdfPath: String,
  
    verificationCode: String,
  
    qrCodeUrl: String,
  
    issuedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  
  }, { timestamps: true });
  
  export default mongoose.model("GeneratedCertificate", GeneratedCertificateSchema);