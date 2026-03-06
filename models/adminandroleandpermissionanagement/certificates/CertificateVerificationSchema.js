import mongoose from "mongoose";

const CertificateVerificationSchema = new mongoose.Schema({

    hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", required: true },
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true },
  
    certificateId: { type: mongoose.Schema.Types.ObjectId, ref: "GeneratedCertificate" },
  
    verificationCode: String,
  
    verifiedAt: Date,
  
    verifiedByIp: String
  
  });
  
  export default mongoose.model("CertificateVerification", CertificateVerificationSchema);