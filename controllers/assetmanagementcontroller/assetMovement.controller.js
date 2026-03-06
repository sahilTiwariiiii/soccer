import AssetMovement from "../../models/assetmanagement/AssetMovement.js";
import { createCrudHandlers } from "../_shared/crudFactory.js";

const scope = [
  { tokenKey: "hospitalId", modelField: "hospital_id" },
  { tokenKey: "branchId", modelField: "branch_id" },
];

const { create, getAll, getById, updateById, deleteById } = createCrudHandlers({
  Model: AssetMovement,
  scope,
});

export const createAssetMovement = create;
export const getAssetMovements = getAll;
export const getAssetMovementById = getById;
export const updateAssetMovement = updateById;
export const deleteAssetMovement = deleteById;

