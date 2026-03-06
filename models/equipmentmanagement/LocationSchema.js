import mongoose from "mongoose";

const LocationSchema = new mongoose.Schema({
  hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", required: true },
  branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true },

  name: { type: String, required: true },
  floor: String,
  roomNumber: String,
  departmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Department" }
}, { timestamps: true });

export default mongoose.model("Location", LocationSchema);