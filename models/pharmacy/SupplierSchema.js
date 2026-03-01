import mongoose from "mongoose";

const { Schema } = mongoose;

const SupplierSchema = new Schema(
  {
    hospitalId: {
      type: Schema.Types.ObjectId,
      ref: "Hospital",
      required: true
    },

    branchId: {
      type: Schema.Types.ObjectId,
      ref: "Branch"
    },

    supplierName: {
      type: String,
      required: true,
      trim: true
    },

    contactPerson: {
      type: String,
      trim: true
    },

    phone: {
      type: String,
      trim: true
    },

    email: {
      type: String,
      trim: true,
      lowercase: true
    },

    address: {
      type: String,
      trim: true
    },

    gstNumber: {
      type: String,
      trim: true,
      uppercase: true
    },

    isActive: {
      type: Boolean,
      default: true
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },

    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Supplier", SupplierSchema);