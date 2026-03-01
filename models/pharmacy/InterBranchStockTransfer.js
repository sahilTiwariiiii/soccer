const StockTransferSchema = new mongoose.Schema({

    hospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true
    },
  
    fromBranchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true
    },
  
    toBranchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true
    },
  
    medicineId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MedicineMaster",
      required: true
    },
  
    batchNumber: String,
    quantity: Number,
  
    status: {
      type: String,
      enum: ["Requested","Approved","InTransit","Completed"],
      default: "Requested"
    },
  
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  
  }, { timestamps: true });