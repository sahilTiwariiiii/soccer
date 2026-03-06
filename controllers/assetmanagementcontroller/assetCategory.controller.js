import AssetCategory from "../../models/assetmanagement/AssetCategory.js";
import { createCrudHandlers } from "../_shared/crudFactory.js";

const scope = [
  { tokenKey: "hospitalId", modelField: "hospital_id" },
  { tokenKey: "branchId", modelField: "branch_id" },
];

const { create, getAll, getById, updateById, deleteById } = createCrudHandlers({
  Model: AssetCategory,
  scope,
});

export const createAssetCategory = create;
export const getAssetCategories = getAll;
export const getAssetCategoryById = getById;
export const updateAssetCategory = updateById;
export const deleteAssetCategory = deleteById;

