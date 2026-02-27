import mongoose from "mongoose";
// Investigation = Test ka naam (Template / Menu item)
const InvestigationMasterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, enum: ["Lab", "Radiology"], required: true },
    price: { type: Number, required: true },
    isActive: { type: Boolean, default: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
  }, { timestamps: true });
  
  const InvestigationMaster= mongoose.model("InvestigationMaster", InvestigationMasterSchema);
  export default InvestigationMaster;