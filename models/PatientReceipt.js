import mongoose from "mongoose";

const receiptSchema = new mongoose.Schema(
  {
    receiptNumber: { type: String, required: true, unique: true },
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: "PatientRegistration", required: true },
    uhid: { type: String, required: true },

    visitId: { type: mongoose.Schema.Types.ObjectId, ref: "PatientVisit" },

    departmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },

    paymentMode: { type: String, enum: ["Cash", "Card", "UPI", "Wallet", "Insurance"], required: true },
   
    discountPercent: { type: Number, default: 0 },
    fee: { type: Number, default: 0 },

    status: { type: String, enum: ["Paid", "Pending", "Refunded"], default: "Paid" },
    remarks: { type: String },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Receipt= mongoose.model("Receipt", receiptSchema);
export default Receipt;

