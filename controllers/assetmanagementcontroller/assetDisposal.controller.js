import AssetDisposal from "../../models/assetmanagement/AssetDisposal.js";
import { createCrudHandlers } from "../_shared/crudFactory.js";

const scope = [
  { tokenKey: "hospitalId", modelField: "hospital_id" },
  { tokenKey: "branchId", modelField: "branch_id" },
];

const { create, getAll, getById, updateById, deleteById } = createCrudHandlers({
  Model: AssetDisposal,
  scope,
  populate: "asset_id",
});

export const createAssetDisposal = create;
export const getAssetDisposals = getAll;
export const getAssetDisposalById = getById;
export const updateAssetDisposal = updateById;
export const deleteAssetDisposal = deleteById;

