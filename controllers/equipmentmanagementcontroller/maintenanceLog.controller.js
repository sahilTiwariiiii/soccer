import MaintenanceLog from "../../models/equipmentmanagement/MaintenanceLogSchema.js";
import { createCrudHandlers } from "../_shared/crudFactory.js";

const scope = [
  { tokenKey: "hospitalId", modelField: "hospitalId" },
  { tokenKey: "branchId", modelField: "branchId" },
];

const { create, getAll, getById, updateById, deleteById } = createCrudHandlers({
  Model: MaintenanceLog,
  scope,
  populate: "equipmentId vendorId",
});

export const createMaintenanceLog = create;
export const getMaintenanceLogs = getAll;
export const getMaintenanceLogById = getById;
export const updateMaintenanceLog = updateById;
export const deleteMaintenanceLog = deleteById;

