import mongoose from "mongoose";

const SparePartSchema = new mongoose.Schema({
  hospitalId: mongoose.Schema.Types.ObjectId,
  branchId: mongoose.Schema.Types.ObjectId,

  name: String,
  partNumber: String,

  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor" },

  stockQuantity: Number
}, { timestamps: true });

export default mongoose.model("SparePart", SparePartSchema);