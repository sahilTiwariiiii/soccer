import mongoose from "mongoose";

const GlobalVisitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  unit: { type: String },
  dataType: {
    type: String,
    enum: ["number", "text", "boolean"],
    default: "number",
  },
  normalMin: Number,
  normalMax: Number,

  // 🔥 IMPORTANT
  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    default: null, // null = GLOBAL vital
  },

  isActive: { type: Boolean, default: true },
}, { timestamps: true });

const GlobalVisit= mongoose.model("GlobalVisit", GlobalVisitSchema);
export default GlobalVisit;
