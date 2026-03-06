import mongoose from "mongoose";

const AssetAuditSchema = new mongoose.Schema(
{
    hospital_id: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", required: true },
    branch_id: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true },

    asset_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AssetMaster"
    },

    verified_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    verification_date: Date,

    condition: String,

    remarks: String

},
{ timestamps: true }
);

export default mongoose.model("AssetAudit", AssetAuditSchema);