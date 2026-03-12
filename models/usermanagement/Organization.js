import mongoose from "mongoose";

const OrganizationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  registrationNumber: String,
  taxId: String,
  email: String,
  phone: String,
  website: String,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  logo: String,
  settings: {
    timezone: {
      type: String,
      default: "UTC"
    },
    currency: {
      type: String,
      default: "INR"
    },
    workHours: {
      start: String,
      end: String
    }
  },
  hospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital"
  }
}, { timestamps: true });

export default mongoose.model("Organization", OrganizationSchema);
