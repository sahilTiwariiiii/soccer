import mongoose from "mongoose";

const AssetAssignmentSchema = new mongoose.Schema(
{
    hospital_id: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", required: true },
    branch_id: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true },

    asset_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AssetMaster"
    },

    assigned_to_staff: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    department_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department"
    },

    assigned_date: Date,

    returned_date: Date,

    remarks: String

},
{ timestamps: true }
);

export default mongoose.model("AssetAssignment", AssetAssignmentSchema);