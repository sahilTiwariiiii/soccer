import mongoose from "mongoose";

const PharmacyStockSchema = new mongoose.Schema({

  hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", required: true },
  branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true },
  pharmacyId: { type: mongoose.Schema.Types.ObjectId, ref: "Pharmacy", required: true },

  medicineId: { type: mongoose.Schema.Types.ObjectId, ref: "MedicineMaster", required: true },

  batchNumber: { type: String, required: true },
  expiryDate: { type: Date, required: true },

  availableQuantity: { type: Number, required: true },

  purchasePrice: Number,
  sellingPrice: Number,

  supplierId: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier" },

  status: {
    type: String,
    enum: ["Available","Expired","OutOfStock"],
    default: "Available"
  }

}, { timestamps: true });

export default mongoose.model("PharmacyStock", PharmacyStockSchema);