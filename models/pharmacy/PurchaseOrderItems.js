import mongoose from "mongoose";

const PurchaseOrderItemSchema = new mongoose.Schema({

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
  
    purchaseOrderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PurchaseOrder",
      required: true
    },
  
    medicineId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MedicineMaster",
      required: true
    },
  
    quantityOrdered: { type: Number, required: true },
    quantityReceived: { type: Number, default: 0 },
  
    purchasePrice: Number,
    gstPercentage: Number,
    totalAmount: Number
  
  }, { timestamps: true });

export default mongoose.model("PurchaseOrderItem", PurchaseOrderItemSchema);