import AssetMaster from "../../models/assetmanagement/AssetMaster.js";
import { createCrudHandlers } from "../_shared/crudFactory.js";

const scope = [
  { tokenKey: "hospitalId", modelField: "hospital_id" },
  { tokenKey: "branchId", modelField: "branch_id" },
];

const { create, getAll, getById, updateById, deleteById } = createCrudHandlers({
  Model: AssetMaster,
  scope,
});

export const createAssetMaster = create;
export const getAssetMasters = getAll;
export const getAssetMasterById = getById;
export const updateAssetMaster = updateById;
export const deleteAssetMaster = deleteById;

