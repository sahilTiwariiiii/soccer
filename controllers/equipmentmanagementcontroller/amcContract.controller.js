import AMCContract from "../../models/equipmentmanagement/AMCContractSchema.js";
import { createCrudHandlers } from "../_shared/crudFactory.js";

const scope = [
  { tokenKey: "hospitalId", modelField: "hospitalId" },
  { tokenKey: "branchId", modelField: "branchId" },
];

const { create, getAll, getById, updateById, deleteById } = createCrudHandlers({
  Model: AMCContract,
  scope,
});

export const createAMCContract = create;
export const getAMCContracts = getAll;
export const getAMCContractById = getById;
export const updateAMCContract = updateById;
export const deleteAMCContract = deleteById;

