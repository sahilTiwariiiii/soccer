import mongoose from "mongoose";

const AssetInsuranceSchema = new mongoose.Schema(
{
    hospital_id: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", required: true },
    branch_id: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true },

    asset_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AssetMaster"
    },

    policy_number: String,

    insurance_company: String,

    coverage_amount: Number,

    start_date: Date,
    expiry_date: Date

},
{ timestamps: true }
);

export default mongoose.model("AssetInsurance", AssetInsuranceSchema);