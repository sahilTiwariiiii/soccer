const InsuranceClaimSchema = new mongoose.Schema({

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
  
    insuranceCompany: String,
    claimAmount: Number,
  
    claimStatus: {
      type: String,
      enum: ["Submitted","Approved","Rejected","Settled"],
      default: "Submitted"
    }
  
  }, { timestamps: true });

  