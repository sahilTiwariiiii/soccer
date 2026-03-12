import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  clockIn: {
    time: Date,
    location: {
      lat: Number,
      lng: Number
    },
    device: String,
    ip: String
  },
  clockOut: {
    time: Date,
    location: {
      lat: Number,
      lng: Number
    },
    device: String,
    ip: String
  },
  status: {
    type: String,
    enum: ["Present", "Absent", "Late", "Half-day", "On-Leave"],
    default: "Present"
  },
  workHours: {
    type: Number,
    default: 0
  },
  overtime: {
    type: Number,
    default: 0
  },
  isRegularized: {
    type: Boolean,
    default: false
  },
  regularizationReason: String,
  hospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital"
  },
  branchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch"
  }
}, { timestamps: true });

export default mongoose.model("Attendance", AttendanceSchema);
