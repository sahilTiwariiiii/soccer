import mongoose from "mongoose";

const MaintenanceScheduleSchema = new mongoose.Schema({
  hospitalId: mongoose.Schema.Types.ObjectId,
  branchId: mongoose.Schema.Types.ObjectId,

  equipmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Equipment", required: true },

  frequency: {
    type: String,
    enum: ["monthly", "quarterly", "half-yearly", "yearly"]
  },

  nextMaintenanceDate: Date,
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor" }
}, { timestamps: true });

export default mongoose.model("MaintenanceSchedule", MaintenanceScheduleSchema);