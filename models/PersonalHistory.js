const PersonalHistorySchema = new mongoose.Schema({
    visitId: { type: mongoose.Schema.Types.ObjectId, ref: "PatientVisit" },
    diet: {type: String,enums:["Vegetarian", "Non-Vegetarian"]},
    appetite: {type:String,enums:["Normal", "Reduced", "Increased"]},
    sleep: {type:String,enums:["Normal", "Reduced", "Increased"]},
    bladder: {type:String,enums:["Consistent", "Inconsistent"]},
    bowel: {type:String,enums:["Normal", "Loose-Motions", "Constipation"]},
    createdByUser:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
  }, { timestamps: true });
  
  const PersonalHistory= mongoose.model("PersonalHistory", PersonalHistorySchema);
  export default PersonalHistory;