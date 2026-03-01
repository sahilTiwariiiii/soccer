const DoctorAvailabilitySchema = new mongoose.Schema({
    hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", required: true },
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  
    dayOfWeek: {
      type: String,
      enum: ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
      required: true
    },
  
    startTime: { type: String, required: true }, // "09:00"
    endTime: { type: String, required: true },   // "17:00"
  
    breakStart: String,
    breakEnd: String,
  
    maxPatientsPerDay: Number,
  
    isActive: { type: Boolean, default: true }
  
  }, { timestamps: true });
  
  export default mongoose.model("DoctorAvailability", DoctorAvailabilitySchema);