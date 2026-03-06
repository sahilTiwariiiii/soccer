import AssetDocument from "../../models/assetmanagement/AssetDocument.js";
import { createCrudHandlers } from "../_shared/crudFactory.js";

const scope = [
  { tokenKey: "hospitalId", modelField: "hospital_id" },
  { tokenKey: "branchId", modelField: "branch_id" },
];

const { create, getAll, getById, updateById, deleteById } = createCrudHandlers({
  Model: AssetDocument,
  scope,
});

export const createAssetDocument = create;
export const getAssetDocuments = getAll;
export const getAssetDocumentById = getById;
export const updateAssetDocument = updateById;
export const deleteAssetDocument = deleteById;

