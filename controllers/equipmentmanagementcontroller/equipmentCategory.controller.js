import EquipmentCategory from "../../models/equipmentmanagement/EquipmentCategorySchema.js";
import { createCrudHandlers } from "../_shared/crudFactory.js";

const scope = [
  { tokenKey: "hospitalId", modelField: "hospitalId" },
  { tokenKey: "branchId", modelField: "branchId" },
];

const { create, getAll, getById, updateById, deleteById } = createCrudHandlers({
  Model: EquipmentCategory,
  scope,
});

export const createEquipmentCategory = create;
export const getEquipmentCategories = getAll;
export const getEquipmentCategoryById = getById;
export const updateEquipmentCategory = updateById;
export const deleteEquipmentCategory = deleteById;

