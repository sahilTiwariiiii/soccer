// models/BloodGroup.js
import mongoose from "mongoose";

const BloodGroupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("BloodGroup", BloodGroupSchema);