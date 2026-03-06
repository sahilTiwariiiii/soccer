import mongoose from "mongoose";

const CertificateTypeSchema = new mongoose.Schema({
  hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", required: true },
  branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true },

  name: { type: String, required: true }, // Medical, Birth, Death
  description: String,

  templateId: { type: mongoose.Schema.Types.ObjectId, ref: "CertificateTemplate" },

  departmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },

  isActive: { type: Boolean, default: true }

}, { timestamps: true });

export default mongoose.model("CertificateType", CertificateTypeSchema);
// // Medical Certificate
// Fitness Certificate
// Birth Certificate
// Death Certificate
// Vaccination Certificate
// Discharge Certificate