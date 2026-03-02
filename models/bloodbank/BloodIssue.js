// models/BloodIssue.js
import mongoose from "mongoose";

const BloodIssueSchema = new mongoose.Schema(
  {
    hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", required: true },
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true },

    requestId: { type: mongoose.Schema.Types.ObjectId, ref: "BloodRequest", required: true },
    componentId: { type: mongoose.Schema.Types.ObjectId, ref: "BloodComponent", required: true },

    issuedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    issueDate: Date,

    status: {
      type: String,
      enum: ["Issued", "Returned"],
      default: "Issued",
    },
  },
  { timestamps: true }
);

export default mongoose.model("BloodIssue", BloodIssueSchema);