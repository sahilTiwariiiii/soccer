import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
    hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", required: true },
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true },
  
    appointmentNumber: { type: String, unique: true },
  
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  
    appointmentDate: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
  
    consultationType: {
      type: String,
      enum: ["OPD","FollowUp","VideoConsultation","Emergency"],
      default: "OPD"
    },
  
    status: {
      type: String,
      enum: [
        "Booked",
        "Confirmed",
        "CheckedIn",
        "InConsultation",
        "Completed",
        "Cancelled",
        "NoShow",
        "Rescheduled"
      ],
      default: "Booked"
    },
  
    bookedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  
    reason: String,
    notes: String,
  
    cancellationReason: String,
    cancelledBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  
    isActive: { type: Boolean, default: true }
  
  }, { timestamps: true });
  
  export default mongoose.model("Appointment", AppointmentSchema);