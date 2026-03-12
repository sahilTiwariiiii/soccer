import AssetSubCategory from "../../models/assetmanagement/AssetSubCategory.js";
import { createCrudHandlers } from "../_shared/handlerFactory.js";

const scope = [
  { tokenKey: "hospitalId", modelField: "hospital_id" },
  { tokenKey: "branchId", modelField: "branch_id" },
];

const { create, getAll, getById, updateById, deleteById } = createCrudHandlers({
  Model: AssetSubCategory,
  scope,
});

export const createAssetSubCategory = create;
export const getAssetSubCategories = getAll;
export const getAssetSubCategoryById = getById;
export const updateAssetSubCategory = updateById;
export const deleteAssetSubCategory = deleteById;

