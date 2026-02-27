import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({

  // hospitalId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Hospital",
  //   required: true,
  //   index: true
  // },

  visitId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Visit",
    required: true,
    index: true
  },

  investigationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "InvestigationMaster",
    required: true
  },

  priceAtOrderTime: {
    type: Number,
    required: true
  },

  priority: {
    type: String,
    enum: ["Normal", "Urgent"],
    default: "Normal"
  },

  orderStatus: {
    type: String,
    enum: [
      "Ordered",
      "Sample-Collected",
      "In-Progress",
      "Completed",
      "Cancelled"
    ],
    default: "Ordered",
    index: true
  },

  source: {
    type: String,
    enum: ["Digital", "Paper-Entered"],
    required: true
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  sampleCollectedAt: Date,

  completedAt: Date,

  cancelReason: String,

  result: String,

  reportFile: String

}, { timestamps: true });

const InvestigationOrder = mongoose.model("InvestigationOrder", OrderSchema);

export default InvestigationOrder;