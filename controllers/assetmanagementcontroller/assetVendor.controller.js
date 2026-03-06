import AssetVendor from "../../models/assetmanagement/AssetVendor.js";
import { createCrudHandlers } from "../_shared/crudFactory.js";

const scope = [
  { tokenKey: "hospitalId", modelField: "hospital_id" },
  { tokenKey: "branchId", modelField: "branch_id" },
];

const { create, getAll, getById, updateById, deleteById } = createCrudHandlers({
  Model: AssetVendor,
  scope,
});

export const createAssetVendor = create;
export const getAssetVendors = getAll;
export const getAssetVendorById = getById;
export const updateAssetVendor = updateById;
export const deleteAssetVendor = deleteById;

