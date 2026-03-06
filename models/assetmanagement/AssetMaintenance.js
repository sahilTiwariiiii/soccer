import mongoose from "mongoose";

const AssetMaintenanceSchema = new mongoose.Schema(
{
    hospital_id: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", required: true },
    branch_id: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true },

    asset_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AssetMaster"
    },

    maintenance_type: {
        type: String,
        enum: ["preventive","repair","breakdown"]
    },

    technician_name: String,

    vendor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AssetVendor"
    },

    maintenance_date: Date,

    cost: Number,

    next_maintenance_date: Date,

    description: String

},
{ timestamps: true }
);

export default mongoose.model("AssetMaintenance", AssetMaintenanceSchema);