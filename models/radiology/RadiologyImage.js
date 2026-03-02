// models/RadiologyImage.js
import mongoose from "mongoose";

const RadiologyImageSchema = new mongoose.Schema({
  hospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital",
    required: true
  },
  branchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch",
    required: true
  },

  radiologyStudyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RadiologyStudy",
    required: true
  },

  imageUrl: String,   // PACS URL
  dicomId: String

}, { timestamps: true });

export default mongoose.model("RadiologyImage", RadiologyImageSchema);