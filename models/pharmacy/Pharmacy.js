const PharmacySchema = new mongoose.Schema({

    branchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true
    },
  
    name: { type: String, required: true },
  
    pharmacyLicenseNumber: { type: String, required: true },
    drugLicenseValidTill: Date,
    licenseDocumentUrl: String,
  
    pharmacistInCharge: {
      name: String,
      registrationNumber: String,
      contactNumber: String
    },
  
    isLicenseVerified: { type: Boolean, default: false },
  
    isActive: { type: Boolean, default: true }
  
  }, { timestamps: true });
  
  export default mongoose.model("Pharmacy", PharmacySchema);