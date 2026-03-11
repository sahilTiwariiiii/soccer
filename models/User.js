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
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
    required: true
  },
  department_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: true
  },
  assigned_wards: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ward"
  }],
  floor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Floor"
  },
  profile_picture: {
    type: String
  },
  address: {
    type: String
  },
  documents: [
    {
      document_id: String,
      type: String,
      value: String
    }
  ],
  pin_code: {
    type: String
  },
  qualification: {
    type: String
  },
  specialization: {
    type: String
  },
  shift: {
    start_time: String,
    end_time: String,
    days: [String]
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