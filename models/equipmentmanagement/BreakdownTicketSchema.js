import mongoose from "mongoose";

const BreakdownTicketSchema = new mongoose.Schema({
  hospitalId: mongoose.Schema.Types.ObjectId,
  branchId: mongoose.Schema.Types.ObjectId,

  equipmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Equipment" },

  reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  issueDescription: String,

  status: {
    type: String,
    enum: ["open", "in_progress", "resolved"],
    default: "open"
  }
}, { timestamps: true });

export default mongoose.model("BreakdownTicket", BreakdownTicketSchema);