import AssetDisposal from "../../models/assetmanagement/AssetDisposal.js";
import { createCrudHandlers } from "../_shared/crudFactory.js";

const scope = [
  { tokenKey: "hospitalId", modelField: "hospital_id" },
  { tokenKey: "branchId", modelField: "branch_id" },
];

const { create, getAll, getById, updateById, deleteById } = createCrudHandlers({
  Model: AssetDisposal,
  scope,
  populate: {
    path: "asset_id",
    populate: [{ path: "asset_category_id" }, { path: "department_id" }],
  },
});

export const createAssetDisposal = create;
export const getAssetDisposals = getAll;
export const getAssetDisposalById = getById;
export const updateAssetDisposal = updateById;
export const deleteAssetDisposal = deleteById;

