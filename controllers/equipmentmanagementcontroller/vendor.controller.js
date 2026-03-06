import Vendor from "../../models/equipmentmanagement/VendorSchema.js";
import { createCrudHandlers } from "../_shared/crudFactory.js";

const scope = [
  { tokenKey: "hospitalId", modelField: "hospitalId" },
  { tokenKey: "branchId", modelField: "branchId" },
];

const { create, getAll, getById, updateById, deleteById } = createCrudHandlers({
  Model: Vendor,
  scope,
});

export const createVendor = create;
export const getVendors = getAll;
export const getVendorById = getById;
export const updateVendor = updateById;
export const deleteVendor = deleteById;

