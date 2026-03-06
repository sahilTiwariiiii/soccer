import mongoose from "mongoose";

const CalibrationRecordSchema = new mongoose.Schema({
  hospitalId: mongoose.Schema.Types.ObjectId,
  branchId: mongoose.Schema.Types.ObjectId,

  equipmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Equipment" },

  calibrationDate: Date,
  nextCalibrationDate: Date,

  performedBy: String,
  certificateNumber: String
}, { timestamps: true });

export default mongoose.model("CalibrationRecord", CalibrationRecordSchema);