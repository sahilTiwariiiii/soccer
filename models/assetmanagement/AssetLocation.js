import mongoose from "mongoose";

const AssetLocationSchema = new mongoose.Schema(
{
    hospital_id: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", required: true },
    branch_id: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true },

    building: String,
    floor: String,

    room_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room"
    },

    description: String

},
{ timestamps: true }
);

export default mongoose.model("AssetLocation", AssetLocationSchema);