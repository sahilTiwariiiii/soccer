import Alert from "../../models/equipmentmanagement/AlertSchema.js";
import { createCrudHandlers } from "../_shared/crudFactory.js";

const scope = [
  { tokenKey: "hospitalId", modelField: "hospitalId" },
  { tokenKey: "branchId", modelField: "branchId" },
];

const { create, getAll, getById, updateById, deleteById } = createCrudHandlers({
  Model: Alert,
  scope,
});

export const createAlert = create;
export const getAlerts = getAll;
export const getAlertById = getById;
export const updateAlert = updateById;
export const deleteAlert = deleteById;

