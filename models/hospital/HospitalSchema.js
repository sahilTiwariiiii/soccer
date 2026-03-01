import mongoose from "mongoose";

const HospitalSchema = new mongoose.Schema({

  name: { type: String, required: true },

  legalName: { type: String, required: true }, // Registered company name

  registrationNumber: { type: String, required: true }, // Govt registration

  gstNumber: String,
  panNumber: String,

  ownerDetails: {
    name: String,
    contactNumber: String,
    email: String,
    aadhaarNumber: String
  },

  licenses: [{
    licenseType: String,        // Drug License / NABH etc.
    licenseNumber: String,
    validFrom: Date,
    validTill: Date,
    documentUrl: String,
    isVerified: { type: Boolean, default: false },
    verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    verifiedAt: Date
  }],

  address: {
    line1: String,
    city: String,
    state: String,
    pincode: String,
    country: String
  },

  contactNumber: String,
  email: String,
  website: String,

  isActive: { type: Boolean, default: true },
  isVerified: { type: Boolean, default: false },

  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }

}, { timestamps: true });

export default mongoose.model("Hospital", HospitalSchema);