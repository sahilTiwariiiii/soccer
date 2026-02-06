import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema({

  /* ===== CORE ===== */
  uhid: { type: String, unique: true, index: true },




  mobile: { type: String, required: true,unique:true },
  email: String,

  /* ===== DEPARTMENT & DOCTOR ===== */
 

  /* ===== PATIENT BASIC ===== */
  patientName: { type: String, required: true },

  gender: {
    type: String,
    enum: ["Male", "Female", "Other"]
  },

  maritalStatus: {
    type: String,
    enum: ["Single", "Married", "Widow", "Divorced"]
  },

  /* ===== AGE / DOB ===== */

dob:{
    type: Date,
    required: true
},

  age: Number,

  /* ===== GUARDIAN ===== */
  relationType: {
    type: String,
    enum: ["S/O", "D/O", "W/O"]
  },

  guardianName: String,

  /* ===== ADDRESS ===== */
  address: String,

  country: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "Country",
    required: true
   },

  stateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "State"
  },

  cityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "City"
  },

  /* ===== MEDICAL ===== */
  bloodGroup: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-", "NA"],
    default: "NA"
  },

  /* ===== SOURCE / REFERRAL ===== */
  source: {
    type: String,
    enum: ["SELF", "ADV_HOARDING", "DOCTOR", "ONLINE", "CAMP"]
  },



  /* ===== PAYMENT MODE ===== */
 


  /* ===== IMAGE ===== */
  patientImage: String

}, { timestamps: true });

const PatientRegistration= mongoose.model("PatientRegistration", PatientSchema);
export default PatientRegistration;