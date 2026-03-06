import mongoose from "mongoose";

const AssetDepreciationSchema = new mongoose.Schema(
{
    hospital_id: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", required: true },
    branch_id: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true },

    asset_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AssetMaster"
    },

    depreciation_amount: Number,

    depreciation_date: Date,

    book_value: Number

},
{ timestamps: true }
);

export default mongoose.model("AssetDepreciation", AssetDepreciationSchema);