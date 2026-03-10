import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  employee_id: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/.+@.+\..+/, "Please fill a valid email address"]
  },
  hospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital",
    required: true
  },
  branchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch",
    required: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  role: {  //yaha pe Role collection ka reference do
    type: String,
    required: true,
    // Hospital Admin will be able to create multiple roles
    // enum: ["manager", "doctor", "nurse", "receptionist", "lab_technician"]
  },
  department_id: {
    // type: mongoose.Schema.Types.ObjectId,
    // ref: "Department",
    // required: true
  },
  assigned_wards: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ward"
  }],
  profile_picture: {
    type: String,
    default: ""
  },
  address: {
    type: String,
    default: ""
  },
  emergency_contact: {
    type: String,
    default: ""
  },
  documents: [
    {
      document_id: { type:mongoose.Schema.Types.ObjectId, ref: "Document", required: true },
      type: { type: String, enum: ["file", "text"], required: true }, // file or text
      value: { type: String, required: true } // file_url OR text value
    }
    // ab ye har array entry ke liye vlaue ke liye ek new mongoose object id banayega toh ye na ho isliye yaha pe hum '_id:false' likh denge toh har entry ke liye unique id nahi banayega
  ],
  pin_code: {
    type: Number
  },
  qualification: {
    type: String,
    default: ""
  },
  specialization: {
    type: String,
    default: ""
  },
  shift: {
    start_time: { type: String, default: "" },
    end_time: { type: String, default: "" },
    days: [{ type: String, enum: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] }]
  },
  permissions: [{
    type: String
  }],
  password: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
})
// Bilkul, short aur clear 😄

// const User = mongoose.model("User", UserSchema);


// 1️⃣ User (const User = …) → ye JavaScript variable hai jisse aap apne code me use karoge, jaise User.find() ya User.create().

// 2️⃣ "User" (first argument of model) → ye MongoDB collection ka naam hai.

// Mongoose automatically pluralize karke collection me store karega, yani "User" → users collection me save hoga.

// 3️⃣ UserSchema (second argument) → ye schema object hai jisme fields aur validation define kiya gaya hai.

// ✅ Short me:

// First User = JS variable (aapka handle)

// Second "User" = DB collection ka naam
const User = mongoose.model("User", UserSchema);
export default User;