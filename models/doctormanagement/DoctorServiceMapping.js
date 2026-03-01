// Example se samjho 👇

//  Maan lo hospital me 3 services hain:

// ECG

// Endoscopy

// Surgery
// Aur Dr. Sharma sirf ECG aur Endoscopy kar sakte hain.
const DoctorServiceSchema = new mongoose.Schema({
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
  
    services: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service"
    }]
  
  }, { timestamps: true });
  
  export const DoctorService =
    mongoose.model("DoctorService", DoctorServiceSchema);