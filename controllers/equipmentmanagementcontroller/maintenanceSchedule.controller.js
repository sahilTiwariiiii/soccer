import MaintenanceSchedule from "../../models/equipmentmanagement/MaintenanceScheduleSchema.js";
import { createCrudHandlers } from "../_shared/crudFactory.js";

const scope = [
  { tokenKey: "hospitalId", modelField: "hospitalId" },
  { tokenKey: "branchId", modelField: "branchId" },
];

const { create, getAll, getById, updateById, deleteById } = createCrudHandlers({
  Model: MaintenanceSchedule,
  scope,
});

export const createMaintenanceSchedule = create;
export const getMaintenanceSchedules = getAll;
export const getMaintenanceScheduleById = getById;
export const updateMaintenanceSchedule = updateById;
export const deleteMaintenanceSchedule = deleteById;

