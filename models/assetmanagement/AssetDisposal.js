import mongoose from "mongoose";

const AssetDisposalSchema = new mongoose.Schema(
{
    hospital_id: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", required: true },
    branch_id: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true },

    asset_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AssetMaster"
    },

    disposal_type: {
        type: String,
        enum: ["sold","scrapped","donated","writeoff"]
    },

    disposal_date: Date,

    disposal_amount: Number,

    remarks: String

},
{ timestamps: true }
);

export default mongoose.model("AssetDisposal", AssetDisposalSchema);