const DoctorOperationalSchema = new mongoose.Schema({
    hospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true
    },
  
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true
    },
  
    // ✅ Branch-wise Schedule
    schedule: [{
      branchId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        index: true
      },
      dayOfWeek: { type: Number, required: true }, // 0-6
      startTime: String,
      endTime: String,
      slotDuration: { type: Number, default: 15 }
    }],
  
    // ✅ Leave (no need branch here normally)
    leaves: [{
      fromDate: Date,
      toDate: Date,
      reason: String,
      status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending"
      }
    }],
  
    // ✅ Branch-wise Shift
    shifts: [{
      branchId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
      },
      shiftName: String,
      startTime: String,
      endTime: String
    }],
  
    // ✅ Daily Appointment Limit
    maxAppointmentsPerDay: {
      type: Number,
      default: 50
    }
  
  }, { timestamps: true });
  
  export const DoctorOperational =
    mongoose.model("DoctorOperational", DoctorOperationalSchema);