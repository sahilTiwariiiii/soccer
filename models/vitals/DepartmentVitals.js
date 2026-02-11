import mongoose from "mongoose";

const DepartmentVitalSchema = new mongoose.Schema({
  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
  vitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "VitalMaster",
    required: true,
  },
  isMandatory: { type: Boolean, default: false },
  displayOrder: { type: Number, default: 0 },
}, { timestamps: true });

const DepartmentVitals= mongoose.model("DepartmentVitals", DepartmentVitalSchema);
export default DepartmentVitals;
