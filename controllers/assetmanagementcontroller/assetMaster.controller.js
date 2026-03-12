import AssetMaster from "../../models/assetmanagement/AssetMaster.js";
import { createCrudHandlers } from "../_shared/handlerFactory.js";

const scope = [
  { tokenKey: "hospitalId", modelField: "hospital_id" },
  { tokenKey: "branchId", modelField: "branch_id" },
];

const { create, getAll, getById, updateById, deleteById } = createCrudHandlers({
  Model: AssetMaster,
  scope,
  populate: "category_id subcategory_id vendor_id department_id location_id assigned_staff_id",
});

export const createAssetMaster = create;
export const getAssetMasters = getAll;
export const getAssetMasterById = getById;
export const updateAssetMaster = updateById;
export const deleteAssetMaster = deleteById;

