const CertificateTemplateSchema = new mongoose.Schema({

    hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", required: true },
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true },
  
    templateName: { type: String, required: true },
    category: String,
  
    version: { type: Number, default: 1 },
  
    layoutHtml: String, // main HTML layout
    layoutJson: Object, // optional builder layout
  
    header: String,
    footer: String,
  
    logoUrl: String,
  
    pageSize: { type: String, default: "A4" },
  
    orientation: { type: String, enum: ["portrait", "landscape"], default: "portrait" },
  
    isActive: { type: Boolean, default: true },
  
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  
  }, { timestamps: true });
  
  export default mongoose.model("CertificateTemplate", CertificateTemplateSchema);