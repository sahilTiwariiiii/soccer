import mongoose from "mongoose";

const RoomStaffAssignmentSchema = new mongoose.Schema({

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
    ref:"Floor"
  },

  roomId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Room"
  },

  staffId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Users",
    required:true
  },

  role:{
    type:String,
    enum:[
      "Doctor",
      "Nurse",
      "Technician",
      "WardBoy",
      "Admin"
    ]
  },

  shift:{
    type:String,
    enum:["Morning","Evening","Night"]
  },

  assignedFrom:Date,
  assignedTill:Date

},{timestamps:true});

export default mongoose.model("RoomStaffAssignment",RoomStaffAssignmentSchema);