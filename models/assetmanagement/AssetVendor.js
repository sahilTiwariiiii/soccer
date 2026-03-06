import mongoose from "mongoose";

const AssetVendorSchema = new mongoose.Schema(
{
    hospital_id: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", required: true },
    branch_id: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true },

    name: { type: String, required: true },
    contact_person: String,
    phone: String,
    email: String,
    address: String,
    gst_number: String

},
{ timestamps: true }
);

export default mongoose.model("AssetVendor", AssetVendorSchema);