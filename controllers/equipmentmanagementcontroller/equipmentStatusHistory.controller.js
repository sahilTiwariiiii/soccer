import { createCrudHandlers } from "../_shared/crudFactory.js";
import EquipmentStatusHistory from "../../models/equipmentmanagement/EquipmentStatusHistorySchema.js";

const scope = [
  { tokenKey: "hospitalId", modelField: "hospitalId" },
  { tokenKey: "branchId", modelField: "branchId" },
];

const { create, getAll, getById, updateById, deleteById } = createCrudHandlers({
  Model: EquipmentStatusHistory,
  scope,
});

export const createEquipmentStatusHistory = create;
export const getEquipmentStatusHistories = getAll;
export const getEquipmentStatusHistoryById = getById;
export const updateEquipmentStatusHistory = updateById;
export const deleteEquipmentStatusHistory = deleteById;

