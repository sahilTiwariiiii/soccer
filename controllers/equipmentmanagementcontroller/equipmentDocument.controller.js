import EquipmentDocument from "../../models/equipmentmanagement/EquipmentDocumentSchema.js";
import { createCrudHandlers } from "../_shared/crudFactory.js";

const scope = [
  { tokenKey: "hospitalId", modelField: "hospitalId" },
  { tokenKey: "branchId", modelField: "branchId" },
];

const { create, getAll, getById, updateById, deleteById } = createCrudHandlers({
  Model: EquipmentDocument,
  scope,
});

export const createEquipmentDocument = create;
export const getEquipmentDocuments = getAll;
export const getEquipmentDocumentById = getById;
export const updateEquipmentDocument = updateById;
export const deleteEquipmentDocument = deleteById;

