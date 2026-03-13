import mongoose from "mongoose";

const PharmacyInvoiceSchema = new mongoose.Schema({
  hospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital",
    required: true
  },

  branchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch",
    required: true
  },

  prescriptionId: { type: mongoose.Schema.Types.ObjectId, ref: "PrescriptionHeader" },

  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PatientRegistration",
    required: true
  },

  invoiceNumber: String,
  invoiceHtml: String, // HTML content for printable invoice

  totalAmount: Number,
  discount: Number,
  taxAmount: Number,
  netAmount: Number,

  paymentStatus: {
    type: String,
    enum: ["Unpaid","PartiallyPaid","Paid"],
    default: "Unpaid"
  },

  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }

}, { timestamps: true });

export default mongoose.model("PharmacyInvoice", PharmacyInvoiceSchema);