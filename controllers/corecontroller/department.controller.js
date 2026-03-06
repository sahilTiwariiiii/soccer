import Department from "../../models/Department.js";
import { createCrudHandlers } from "../_shared/crudFactory.js";

const { create, getAll, getById, updateById, deleteById } = createCrudHandlers({
  Model: Department,
  scope: [],
});

export const createDepartment = create;
export const getDepartments = getAll;
export const getDepartmentById = getById;
export const updateDepartment = updateById;
export const deleteDepartment = deleteById;

