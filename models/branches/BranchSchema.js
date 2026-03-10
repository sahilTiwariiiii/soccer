import mongoose from "mongoose";

const BranchSchema = new mongoose.Schema({

  hospitalId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Hospital",
    required:true,
    index:true
  },

  name:{
    type:String,
    required:true
  },

  branchCode:{
    type:String,
    required:true,
    unique:true
  },

  branchType:{
    type:String,
    enum:["General","Specialty","SuperSpecialty"]
  },

  branchHead:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Users"
  },

  branchManager:{
    name:String,
    contactNumber:String,
    email:String,
    employeeId:String
  },

  medicalSuperintendent:{
    name:String,
    registrationNumber:String
  },

  address:{
    line1:String,
    line2:String,
    city:String,
    state:String,
    pincode:String
  },

  geoLocation:{
    latitude:Number,
    longitude:Number
  },

  contactNumber:String,
  email:String,

  departments:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Department"
  }],

  licenses:[{
    licenseType:String,
    licenseNumber:String,
    validTill:Date,
    documentUrl:String,
    isVerified:{type:Boolean,default:false}
  }],

  totalFloors:Number,
  totalRooms:Number,

  isActive:{type:Boolean,default:true},
  isVerified:{type:Boolean,default:false},

  createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  }

},{timestamps:true});

export default mongoose.model("Branch",BranchSchema);