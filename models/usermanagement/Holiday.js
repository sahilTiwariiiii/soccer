import mongoose from "mongoose";

const HolidaySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true,
    unique: true
  },
  type: {
    type: String,
    enum: ["National", "Regional", "Company-specific", "Optional"],
    default: "National"
  },
  description: String,
  year: {
    type: Number,
    required: true
  },
  hospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital"
  },
  branchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch"
  }
}, { timestamps: true });

export default mongoose.model("Holiday", HolidaySchema);
