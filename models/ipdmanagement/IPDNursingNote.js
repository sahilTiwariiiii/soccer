// models/IPDNursingNote.js
import mongoose from "mongoose";

const IPDNursingNoteSchema = new mongoose.Schema(
  {
    hospitalId: { type: mongoose.Schema.Types.ObjectId, required: true },
    branchId: { type: mongoose.Schema.Types.ObjectId, required: true },
    ipdId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "IPDAdmission",
      required: true,
    },
    nurseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    note: String,
  },
  { timestamps: true }
);

export default mongoose.model("IPDNursingNote", IPDNursingNoteSchema);