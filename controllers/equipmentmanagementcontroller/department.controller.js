import EquipmentDepartment from "../../models/equipmentmanagement/DepartmentSchema.js";
import { createCrudHandlers } from "../_shared/handlerFactory.js";

const scope = [
  { tokenKey: "hospitalId", modelField: "hospitalId" },
  { tokenKey: "branchId", modelField: "branchId" },
];

const { create, getAll, getById, updateById, deleteById } = createCrudHandlers({
  Model: EquipmentDepartment,
  scope,
});

export const createEquipmentDepartment = create;
export const getEquipmentDepartments = getAll;
export const getEquipmentDepartmentById = getById;
export const updateEquipmentDepartment = updateById;
export const deleteEquipmentDepartment = deleteById;

