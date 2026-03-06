import mongoose from "mongoose";

const AssetCategorySchema = new mongoose.Schema(
{
    hospital_id: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", required: true },
    branch_id: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true },

    name: { type: String, required: true },
    description: String,
    is_active: { type: Boolean, default: true }

},
{ timestamps: true }
);

export default mongoose.model("AssetCategory", AssetCategorySchema);