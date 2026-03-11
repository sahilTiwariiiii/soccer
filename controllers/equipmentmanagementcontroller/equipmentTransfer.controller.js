import EquipmentTransfer from "../../models/equipmentmanagement/EquipmentTransferSchema.js";
import { createCrudHandlers } from "../_shared/crudFactory.js";

const scope = [{ tokenKey: "hospitalId", modelField: "hospitalId" }];

const { create, getAll, getById, updateById, deleteById } = createCrudHandlers({
  Model: EquipmentTransfer,
  scope,
  populate: "equipmentId fromBranchId toBranchId transferredBy",
});

export const createEquipmentTransfer = create;
export const getEquipmentTransfers = getAll;
export const getEquipmentTransferById = getById;
export const updateEquipmentTransfer = updateById;
export const deleteEquipmentTransfer = deleteById;

