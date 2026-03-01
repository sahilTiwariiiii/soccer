const BranchSchema = new mongoose.Schema({

    hospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true
    },
  
    name: { type: String, required: true },
    branchCode: { type: String, required: true },
  
    branchType: {
      type: String,
      enum: ["General","Specialty","SuperSpecialty"]
    },
  
    branchManager: {
      name: String,
      contactNumber: String,
      email: String,
      employeeId: String
    },
  
    medicalSuperintendent: {
      name: String,
      registrationNumber: String
    },
  
    licenses: [{
      licenseType: String,
      licenseNumber: String,
      validTill: Date,
      documentUrl: String,
      isVerified: { type: Boolean, default: false }
    }],
  
    address: {
      line1: String,
      city: String,
      state: String,
      pincode: String
    },
  
    contactNumber: String,
  
    isActive: { type: Boolean, default: true },
    isVerified: { type: Boolean, default: false }
  
  }, { timestamps: true });
  
  export default mongoose.model("Branch", BranchSchema);