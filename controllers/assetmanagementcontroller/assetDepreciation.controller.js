import AssetDepreciation from "../../models/assetmanagement/AssetDepreciation.js";
import { createCrudHandlers } from "../_shared/crudFactory.js";

const scope = [
  { tokenKey: "hospitalId", modelField: "hospital_id" },
  { tokenKey: "branchId", modelField: "branch_id" },
];

const { create, getAll, getById, updateById, deleteById } = createCrudHandlers({
  Model: AssetDepreciation,
  scope,
});

export const createAssetDepreciation = create;
export const getAssetDepreciations = getAll;
export const getAssetDepreciationById = getById;
export const updateAssetDepreciation = updateById;
export const deleteAssetDepreciation = deleteById;

