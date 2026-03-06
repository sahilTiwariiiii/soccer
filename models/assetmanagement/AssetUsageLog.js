import mongoose from "mongoose";

const AssetUsageLogSchema = new mongoose.Schema(
{
    hospital_id: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", required: true },
    branch_id: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true },

    asset_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AssetMaster"
    },

    used_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    usage_start: Date,
    usage_end: Date,

    notes: String

},
{ timestamps: true }
);

export default mongoose.model("AssetUsageLog", AssetUsageLogSchema);