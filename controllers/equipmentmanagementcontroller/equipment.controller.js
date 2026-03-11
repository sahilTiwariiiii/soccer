import Equipment from "../../models/equipmentmanagement/EquipmentSchema.js";
import { createCrudHandlers } from "../_shared/crudFactory.js";

const scope = [
  { tokenKey: "hospitalId", modelField: "hospitalId" },
  { tokenKey: "branchId", modelField: "branchId" },
];

const { create, getAll, getById, updateById, deleteById } = createCrudHandlers({
  Model: Equipment,
  scope,
  populate: "categoryId vendorId departmentId locationId",
});

export const createEquipment = create;
export const getEquipments = getAll;
export const getEquipmentById = getById;
export const updateEquipment = updateById;
export const deleteEquipment = deleteById;

