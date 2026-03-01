const GRNSchema = new mongoose.Schema({

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
  
    invoiceNumber: String,
    invoiceDate: Date,
  
    totalAmount: Number,
  
    receivedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  
  }, { timestamps: true });