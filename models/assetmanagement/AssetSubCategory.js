import mongoose from "mongoose";

const AssetSubCategorySchema = new mongoose.Schema(
{
    hospital_id: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", required: true },
    branch_id: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true },

    category_id: { type: mongoose.Schema.Types.ObjectId, ref: "AssetCategory", required: true },

    name: { type: String, required: true },
    description: String

},
{ timestamps: true }
);

export default mongoose.model("AssetSubCategory", AssetSubCategorySchema);