import mongoose from "mongoose";

const PermissionGroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  permissions: [{
    type: String,
    required: true
  }],
  description: String,
  hospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital"
  },
  branchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch"
  }
}, { timestamps: true });

export default mongoose.model("PermissionGroup", PermissionGroupSchema);
