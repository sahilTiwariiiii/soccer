import EquipmentUsageLog from "../../models/equipmentmanagement/EquipmentUsageLogSchema.js";
import { createCrudHandlers } from "../_shared/crudFactory.js";

const scope = [
  { tokenKey: "hospitalId", modelField: "hospitalId" },
  { tokenKey: "branchId", modelField: "branchId" },
];

const { create, getAll, getById, updateById, deleteById } = createCrudHandlers({
  Model: EquipmentUsageLog,
  scope,
});

export const createEquipmentUsageLog = create;
export const getEquipmentUsageLogs = getAll;
export const getEquipmentUsageLogById = getById;
export const updateEquipmentUsageLog = updateById;
export const deleteEquipmentUsageLog = deleteById;

