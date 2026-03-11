import mongoose from "mongoose";

const CertificateVerificationSchema = new mongoose.Schema({

    hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", required: true },
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true },
  
    certificateNumber: String,
    status: { type: String, enum: ["valid", "invalid"], default: "valid" },
    verificationTimestamp: { type: Date, default: Date.now },
    ipAddress: String,
    location: String
  
  }, { timestamps: true });
  
  export default mongoose.model("CertificateVerification", CertificateVerificationSchema);