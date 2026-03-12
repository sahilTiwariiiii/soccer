import AssetDepreciation from "../../models/assetmanagement/AssetDepreciation.js";
import { createCrudHandlers } from "../_shared/handlerFactory.js";

const scope = [
  { tokenKey: "hospitalId", modelField: "hospital_id" },
  { tokenKey: "branchId", modelField: "branch_id" },
];

const { create, getAll, getById, updateById, deleteById } = createCrudHandlers({
  Model: AssetDepreciation,
  scope,
  populate: "asset_id",
});

export const createAssetDepreciation = create;
export const getAssetDepreciations = getAll;
export const getAssetDepreciationById = getById;
export const updateAssetDepreciation = updateById;
export const deleteAssetDepreciation = deleteById;

