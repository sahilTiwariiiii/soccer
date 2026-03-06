import DepartmentVitals from "../../models/vitals/DepartmentVitals.js";
import { createCrudHandlers } from "../_shared/crudFactory.js";

const { create, getAll, getById, updateById, deleteById } = createCrudHandlers({
  Model: DepartmentVitals,
  scope: [],
});

export const createDepartmentVital = create;
export const getDepartmentVitals = getAll;
export const getDepartmentVitalById = getById;
export const updateDepartmentVital = updateById;
export const deleteDepartmentVital = deleteById;

