import PartsUsageLog from "../../models/equipmentmanagement/PartsUsageLogSchema.js";
import { createCrudHandlers } from "../_shared/crudFactory.js";

const scope = [
  { tokenKey: "hospitalId", modelField: "hospitalId" },
  { tokenKey: "branchId", modelField: "branchId" },
];

const { create, getAll, getById, updateById, deleteById } = createCrudHandlers({
  Model: PartsUsageLog,
  scope,
});

export const createPartsUsageLog = create;
export const getPartsUsageLogs = getAll;
export const getPartsUsageLogById = getById;
export const updatePartsUsageLog = updateById;
export const deletePartsUsageLog = deleteById;

