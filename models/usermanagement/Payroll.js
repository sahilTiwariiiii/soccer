import mongoose from "mongoose";

const PayrollSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  month: {
    type: Number,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  basic: Number,
  hra: Number,
  conveyance: Number,
  specialAllowance: Number,
  medicalAllowance: Number,
  totalEarnings: Number,
  pfDeduction: Number,
  esiDeduction: Number,
  professionalTax: Number,
  tdsDeduction: Number,
  otherDeductions: [{
    name: String,
    amount: Number
  }],
  totalDeductions: Number,
  netSalary: Number,
  paymentStatus: {
    type: String,
    enum: ["Pending", "Processed", "Paid", "Failed"],
    default: "Pending"
  },
  paymentDate: Date,
  paymentReference: String,
  payslipUrl: String,
  hospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital"
  },
  branchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch"
  }
}, { timestamps: true });

PayrollSchema.index({ userId: 1, month: 1, year: 1 }, { unique: true });

export default mongoose.model("Payroll", PayrollSchema);
