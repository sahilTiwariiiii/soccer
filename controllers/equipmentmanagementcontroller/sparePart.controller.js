import SparePart from "../../models/equipmentmanagement/SparePartSchema.js";
import { createCrudHandlers } from "../_shared/crudFactory.js";

const scope = [
  { tokenKey: "hospitalId", modelField: "hospitalId" },
  { tokenKey: "branchId", modelField: "branchId" },
];

const { create, getAll, getById, updateById, deleteById } = createCrudHandlers({
  Model: SparePart,
  scope,
});

export const createSparePart = create;
export const getSpareParts = getAll;
export const getSparePartById = getById;
export const updateSparePart = updateById;
export const deleteSparePart = deleteById;

