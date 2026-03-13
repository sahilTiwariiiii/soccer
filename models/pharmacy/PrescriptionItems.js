import mongoose from "mongoose";

const PrescriptionItemSchema = new mongoose.Schema({

  prescriptionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PrescriptionHeader",
    required: true
  },

  medicineId: { type: mongoose.Schema.Types.ObjectId, ref: "MedicineMaster" },

  medicineName: String,
  form: String,
  strength: String,

  dosage: String,
  frequency: String,
  duration: String,
  route: String,

  quantityPrescribed: { type: Number, required: true },

  quantityDispensed: { type: Number, default: 0 },

  itemStatus: {
    type: String,
    enum: ["Pending","PartiallyDispensed","Dispensed"],
    default: "Pending"
  }

}, { timestamps: true });

export default mongoose.model("PrescriptionItem", PrescriptionItemSchema);