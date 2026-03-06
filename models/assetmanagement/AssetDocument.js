import mongoose from "mongoose";

const AssetDocumentSchema = new mongoose.Schema(
{
    hospital_id: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", required: true },
    branch_id: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true },

    asset_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AssetMaster"
    },

    document_type: String,

    file_url: String,

    uploaded_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

},
{ timestamps: true }
);

export default mongoose.model("AssetDocument", AssetDocumentSchema);