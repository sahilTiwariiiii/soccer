const CertificateSignatureSchema = new mongoose.Schema({

    hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", required: true },
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true },
  
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  
    designation: String,
  
    signatureImage: String,
  
    digitalSignatureHash: String,
  
    isActive: { type: Boolean, default: true }
  
  }, { timestamps: true });
  
  export default mongoose.model("CertificateSignature", CertificateSignatureSchema);