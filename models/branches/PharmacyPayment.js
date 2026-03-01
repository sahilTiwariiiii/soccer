const PharmacyPaymentSchema = new mongoose.Schema({

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
  
    invoiceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PharmacyInvoice",
      required: true
    },
  
    paymentMode: {
      type: String,
      enum: ["Cash","Card","UPI","Insurance"]
    },
  
    amountPaid: Number,
    transactionId: String,
  
    receivedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  
  }, { timestamps: true });