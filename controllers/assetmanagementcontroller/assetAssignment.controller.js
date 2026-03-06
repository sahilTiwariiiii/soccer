import AssetAssignment from "../../models/assetmanagement/AssetAssignment.js";
import { createCrudHandlers } from "../_shared/crudFactory.js";

const scope = [
  { tokenKey: "hospitalId", modelField: "hospital_id" },
  { tokenKey: "branchId", modelField: "branch_id" },
];

const { create, getAll, getById, updateById, deleteById } = createCrudHandlers({
  Model: AssetAssignment,
  scope,
});

export const createAssetAssignment = create;
export const getAssetAssignments = getAll;
export const getAssetAssignmentById = getById;
export const updateAssetAssignment = updateById;
export const deleteAssetAssignment = deleteById;

