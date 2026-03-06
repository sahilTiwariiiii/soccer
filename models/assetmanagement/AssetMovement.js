import mongoose from "mongoose";

const AssetMovementSchema = new mongoose.Schema(
{
    hospital_id: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", required: true },

    from_branch_id: { type: mongoose.Schema.Types.ObjectId, ref: "Branch" },
    to_branch_id: { type: mongoose.Schema.Types.ObjectId, ref: "Branch" },

    asset_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AssetMaster"
    },

    from_location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AssetLocation"
    },

    to_location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AssetLocation"
    },

    transfer_date: Date,

    transferred_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    reason: String

},
{ timestamps: true }
);

export default mongoose.model("AssetMovement", AssetMovementSchema);