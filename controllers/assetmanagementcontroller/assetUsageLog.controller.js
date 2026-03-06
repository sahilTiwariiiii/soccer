import AssetUsageLog from "../../models/assetmanagement/AssetUsageLog.js";
import { createCrudHandlers } from "../_shared/crudFactory.js";

const scope = [
  { tokenKey: "hospitalId", modelField: "hospital_id" },
  { tokenKey: "branchId", modelField: "branch_id" },
];

const { create, getAll, getById, updateById, deleteById } = createCrudHandlers({
  Model: AssetUsageLog,
  scope,
});

export const createAssetUsageLog = create;
export const getAssetUsageLogs = getAll;
export const getAssetUsageLogById = getById;
export const updateAssetUsageLog = updateById;
export const deleteAssetUsageLog = deleteById;

