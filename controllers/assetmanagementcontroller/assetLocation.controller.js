import AssetLocation from "../../models/assetmanagement/AssetLocation.js";
import { createCrudHandlers } from "../_shared/handlerFactory.js";

const scope = [
  { tokenKey: "hospitalId", modelField: "hospital_id" },
  { tokenKey: "branchId", modelField: "branch_id" },
];

const { create, getAll, getById, updateById, deleteById } = createCrudHandlers({
  Model: AssetLocation,
  scope,
});

export const createAssetLocation = create;
export const getAssetLocations = getAll;
export const getAssetLocationById = getById;
export const updateAssetLocation = updateById;
export const deleteAssetLocation = deleteById;

