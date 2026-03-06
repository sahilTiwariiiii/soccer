import AssetInsurance from "../../models/assetmanagement/AssetInsurance.js";
import { createCrudHandlers } from "../_shared/crudFactory.js";

const scope = [
  { tokenKey: "hospitalId", modelField: "hospital_id" },
  { tokenKey: "branchId", modelField: "branch_id" },
];

const { create, getAll, getById, updateById, deleteById } = createCrudHandlers({
  Model: AssetInsurance,
  scope,
});

export const createAssetInsurance = create;
export const getAssetInsurances = getAll;
export const getAssetInsuranceById = getById;
export const updateAssetInsurance = updateById;
export const deleteAssetInsurance = deleteById;

