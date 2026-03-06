import mongoose from "mongoose";

const VendorSchema = new mongoose.Schema({
  hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", required: true },
  branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true },

  name: { type: String, required: true },
  contactPerson: String,
  phone: String,
  email: String,
  address: String
}, { timestamps: true });

export default mongoose.model("Vendor", VendorSchema);