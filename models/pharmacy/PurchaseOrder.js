const PurchaseOrderSchema = new mongoose.Schema({

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
  
    supplierId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
      required: true
    },
  
    orderNumber: { type: String, required: true },
    orderDate: { type: Date, default: Date.now },
  
    status: {
      type: String,
      enum: ["Draft","Ordered","PartiallyReceived","Completed","Cancelled"],
      default: "Draft"
    },
  
    totalAmount: Number,
  
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  
  }, { timestamps: true });