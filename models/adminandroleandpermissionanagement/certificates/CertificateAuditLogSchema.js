const CertificateAuditLogSchema = new mongoose.Schema({

    hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", required: true },
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true },
  
    certificateId: { type: mongoose.Schema.Types.ObjectId, ref: "GeneratedCertificate" },
  
    action: {
      type: String,
      enum: ["create", "update", "issue", "cancel", "download"]
    },
  
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  
    changes: Object,
  
    timestamp: { type: Date, default: Date.now }
  
  });
  
  export default mongoose.model("CertificateAuditLog", CertificateAuditLogSchema);