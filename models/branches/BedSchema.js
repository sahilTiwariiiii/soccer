import mongoose from "mongoose";

const BedSchema = new mongoose.Schema({

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

  roomId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Room",
    required:true
  },

  bedNumber:{
    type:String,
    required:true
  },

  bedType:{
    type:String,
    enum:["General","ICU","SemiPrivate","Private"]
  },

  status:{
    type:String,
    enum:["Available","Occupied","Cleaning","Maintenance"],
    default:"Available"
  }

},{timestamps:true});

export default mongoose.model("BedSchema",BedSchema);