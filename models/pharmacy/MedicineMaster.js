import mongoose from "mongoose";
// ye commong hoga agar meri 10 branch hai toh ye toh comon hi hoga because ye ek  medicie ka collection hai jo har branch me use hoga so that har branch ke liye alag alag create na karni pade 
// Medicine Master (Drug Catalog)
const MedicineMasterSchema = new mongoose.Schema({

  hospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital",
    required: true
  },

  name: { type: String, required: true },
  genericName: String,
  brandName: String,

  category: String,

  scheduleType: {
    type: String,
    enum: ["OTC","ScheduleH","ScheduleX"]
  },

  form: String,
  strength: String,

  manufacturer: String,

  hsnCode: String,
  gstPercentage: Number,

  isActive: { type: Boolean, default: true },

  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }

}, { timestamps: true });

export default mongoose.model("MedicineMaster", MedicineMasterSchema);