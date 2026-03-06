import mongoose from "mongoose";

const FloorSchema = new mongoose.Schema({

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

  floorName:{
    type:String,
    required:true
  },

  floorNumber:{
    type:Number,
    required:true
  },

  floorType:{
    type:String,
    enum:[
      "OPD",
      "Ward",
      "ICU",
      "Administration",
      "OperationTheatre",
      "Diagnostics",
      "Mixed"
    ]
  },

  floorManager:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Users"
  },

  description:String,

  totalRooms:{
    type:Number,
    default:0
  },

  isActive:{
    type:Boolean,
    default:true
  }

},{timestamps:true});

export default mongoose.model("Floor",FloorSchema);