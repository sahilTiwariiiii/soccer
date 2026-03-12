import mongoose from "mongoose";

const SalaryStructureSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },
  basic: {
    type: Number,
    required: true
  },
  hra: {
    type: Number,
    default: 0
  },
  conveyance: {
    type: Number,
    default: 0
  },
  specialAllowance: {
    type: Number,
    default: 0
  },
  medicalAllowance: {
    type: Number,
    default: 0
  },
  deductions: [{
    name: String,
    amount: Number
  }],
  pfEnabled: {
    type: Boolean,
    default: true
  },
  esiEnabled: {
    type: Boolean,
    default: true
  },
  totalGross: Number,
  totalNet: Number,
  hospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital"
  },
  branchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch"
  }
}, { timestamps: true });

export default mongoose.model("SalaryStructure", SalaryStructureSchema);
