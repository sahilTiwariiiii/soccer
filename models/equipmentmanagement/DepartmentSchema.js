import mongoose from "mongoose";

const DepartmentSchema = new mongoose.Schema({
  hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", required: true },
  branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true },

  name: { type: String, required: true },
  code: String,
  description: String
}, { timestamps: true });

export default mongoose.model("Department", DepartmentSchema); 