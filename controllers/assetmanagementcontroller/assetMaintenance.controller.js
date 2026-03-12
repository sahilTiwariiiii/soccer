import AssetMaintenance from "../../models/assetmanagement/AssetMaintenance.js";
import { createCrudHandlers } from "../_shared/handlerFactory.js";

const scope = [
  { tokenKey: "hospitalId", modelField: "hospital_id" },
  { tokenKey: "branchId", modelField: "branch_id" },
];

const { create, getAll, getById, updateById, deleteById } = createCrudHandlers({
  Model: AssetMaintenance,
  scope,
  populate: "asset_id vendor_id",
});

export const createAssetMaintenance = create;
export const getAssetMaintenances = getAll;
export const getAssetMaintenanceById = getById;
export const updateAssetMaintenance = updateById;
export const deleteAssetMaintenance = deleteById;

