import mongoose from "mongoose";

const { Schema } = mongoose;

const StockAdjustmentSchema = new Schema(
  {
    hospitalId: {
      type: Schema.Types.ObjectId,
      ref: "Hospital",
      required: true
    },

    branchId: {
      type: Schema.Types.ObjectId,
      ref: "Branch",
      required: true
    },

    stockId: {
      type: Schema.Types.ObjectId,
      ref: "PharmacyStock",
      required: true
    },

    adjustmentType: {
      type: String,
      enum: ["Damage", "Expired", "AuditCorrection"],
      required: true
    },

    quantity: {
      type: Number,
      required: true
    },

    reason: {
      type: String,
      trim: true
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    approvedBy: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

export default mongoose.model("StockAdjustment", StockAdjustmentSchema);