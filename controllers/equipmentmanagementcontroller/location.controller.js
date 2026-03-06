import Location from "../../models/equipmentmanagement/LocationSchema.js";
import { createCrudHandlers } from "../_shared/crudFactory.js";

const scope = [
  { tokenKey: "hospitalId", modelField: "hospitalId" },
  { tokenKey: "branchId", modelField: "branchId" },
];

const { create, getAll, getById, updateById, deleteById } = createCrudHandlers({
  Model: Location,
  scope,
});

export const createLocation = create;
export const getLocations = getAll;
export const getLocationById = getById;
export const updateLocation = updateById;
export const deleteLocation = deleteById;

