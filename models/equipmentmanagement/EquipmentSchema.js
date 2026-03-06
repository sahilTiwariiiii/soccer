import mongoose from "mongoose";

const EquipmentSchema = new mongoose.Schema({
  hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", required: true },
  branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true },

  name: { type: String, required: true },
  equipmentCode: { type: String, required: true, unique: true },

  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "EquipmentCategory" },

  brand: String,
  model: String,
  serialNumber: String,

  purchaseDate: Date,
  purchaseCost: Number,

  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor" },

  departmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
  locationId: { type: mongoose.Schema.Types.ObjectId, ref: "Location" },

  status: {
    type: String,
    enum: ["active", "maintenance", "broken", "retired"],
    default: "active"
  },

  warrantyExpiry: Date,
  notes: String
}, { timestamps: true });

export default mongoose.model("Equipment", EquipmentSchema);