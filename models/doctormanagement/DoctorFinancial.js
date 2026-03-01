const DoctorFinancialSchema = new mongoose.Schema({
    hospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true
    },
  
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true
    },
  
    // ✅ Branch-wise Fees
    consultationFees: [{
      branchId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
      },
      opdFee: Number,
      ipdVisitFee: Number,
      emergencyFee: Number
    }],
  
    // ✅ Commission Setup
    commission: {
      type: {
        type: String,
        enum: ["Percentage", "Fixed"]
      },
      value: Number
    }
  
  }, { timestamps: true });
  
  export const DoctorFinancial =
    mongoose.model("DoctorFinancial", DoctorFinancialSchema);