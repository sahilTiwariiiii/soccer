import mongoose from "mongoose";

const AlertSchema = new mongoose.Schema({
  hospitalId: mongoose.Schema.Types.ObjectId,
  branchId: mongoose.Schema.Types.ObjectId,

  equipmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Equipment" },

  alertType: {
    type: String,
    enum: ["maintenance_due", "calibration_due", "warranty_expiry"]
  },

  alertDate: Date,
  message: String
}, { timestamps: true });

export default mongoose.model("Alert", AlertSchema);