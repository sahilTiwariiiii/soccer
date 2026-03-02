const InvestigationMasterSchema = new mongoose.Schema({

  hospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital",
    required: true,
    index: true
  },

  branchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch",
    required: true,
    index: true
  },

  name: { type: String, required: true },

  category: { 
    type: String, 
    enum: ["Lab", "Radiology"], 
    required: true 
  },

  price: { type: Number, required: true },

  isActive: { type: Boolean, default: true },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }

}, { timestamps: true });