import mongoose from "mongoose";

const AssetMasterSchema = new mongoose.Schema(
{
    hospital_id: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", required: true },
    branch_id: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true },

    asset_name: { type: String, required: true },

    asset_code: { type: String, unique: true },

    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AssetCategory"
    },

    subcategory_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AssetSubCategory"
    },

    brand: String,
    model: String,

    serial_number: String,

    barcode: String,
    qr_code: String,

    purchase_date: Date,
    purchase_cost: Number,

    vendor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AssetVendor"
    },

    warranty_expiry: Date,

    depreciation_method: String,
    depreciation_rate: Number,

    department_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department"
    },

    location_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AssetLocation"
    },

    assigned_staff_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    status: {
        type: String,
        enum: ["available","assigned","maintenance","disposed"],
        default: "available"
    }

},
{ timestamps: true }
);

export default mongoose.model("AssetMaster", AssetMasterSchema);