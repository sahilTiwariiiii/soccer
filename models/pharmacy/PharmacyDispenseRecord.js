import mongoose from "mongoose";

const PharmacyDispenseSchema = new mongoose.Schema({

    hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", required: true },
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true },
    pharmacyId: { type: mongoose.Schema.Types.ObjectId, ref: "Pharmacy", required: true },
  
    prescriptionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PrescriptionHeader",
      required: true
    },
  
    prescriptionItemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PrescriptionItem",
      required: true
    },
  
    stockId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PharmacyStock",
      required: true
    },
  
    batchNumber: String,
    quantityGiven: { type: Number, required: true },
  
    dispensedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  
  }, { timestamps: true });

export default mongoose.model("PharmacyDispense", PharmacyDispenseSchema);