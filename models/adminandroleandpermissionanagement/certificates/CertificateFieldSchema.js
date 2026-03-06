import mongoose from "mongoose";

const CertificateFieldSchema = new mongoose.Schema({

    hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", required: true },
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true },
  
    templateId: { type: mongoose.Schema.Types.ObjectId, ref: "CertificateTemplate", required: true },
  
    fieldName: { type: String, required: true },
    label: String,
  
    dataType: {
      type: String,
      enum: ["text", "number", "date", "textarea", "boolean"]
    },
  
    placeholderKey: { type: String, required: true },
  
    required: { type: Boolean, default: false },
  
    validationRules: Object,
  
    order: Number
  
  }, { timestamps: true });
  
  export default mongoose.model("CertificateField", CertificateFieldSchema);