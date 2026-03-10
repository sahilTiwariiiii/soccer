import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({

  hospitalId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Hospital",
    required:true
  },

  branchId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Branch",
    required:true
  },

  floorId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Floor",
    required:true
  },

  roomNumber:{
    type:String,
    required:true
  },

  roomName:String,

  roomType:{
    type:String,
    enum:[
      "Consultation",
      "Ward",
      "ICU",
      "OT",
      "Lab",
      "Radiology",
      "Pharmacy",
      "Office",
      "WaitingArea"
    ]
  },

  departmentId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Department"
  },

  capacity:{
    type:Number,
    default:1
  },

  status:{
    type:String,
    enum:["Available","Occupied","Maintenance"],
    default:"Available"
  },

  assignedDoctor:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },

  notes:String

},{timestamps:true});

export default mongoose.model("Room",RoomSchema);