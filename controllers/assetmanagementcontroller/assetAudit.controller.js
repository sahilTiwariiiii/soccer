import AssetAudit from "../../models/assetmanagement/AssetAudit.js";
import { createCrudHandlers } from "../_shared/handlerFactory.js";

const scope = [
  { tokenKey: "hospitalId", modelField: "hospital_id" },
  { tokenKey: "branchId", modelField: "branch_id" },
];

const { create, getAll, getById, updateById, deleteById } = createCrudHandlers({
  Model: AssetAudit,
  scope,
});

export const createAssetAudit = create;
export const getAssetAudits = getAll;
export const getAssetAuditById = getById;
export const updateAssetAudit = updateById;
export const deleteAssetAudit = deleteById;

