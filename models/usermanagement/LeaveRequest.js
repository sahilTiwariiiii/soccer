import mongoose from "mongoose";

const LeaveRequestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  leaveType: {
    type: String,
    enum: ["Sick", "Casual", "Earned", "Maternity", "Paternity", "Loss-of-Pay"],
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  totalDays: {
    type: Number,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected", "Cancelled"],
    default: "Pending"
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  comment: String,
  attachment: String,
  hospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital"
  },
  branchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch"
  }
}, { timestamps: true });

export default mongoose.model("LeaveRequest", LeaveRequestSchema);
