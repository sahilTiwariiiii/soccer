import GlobalVitals from "../../models/vitals/GlobalVitals.js";
import { createCrudHandlers } from "../_shared/crudFactory.js";

const { create, getAll, getById, updateById, deleteById } = createCrudHandlers({
  Model: GlobalVitals,
  scope: [],
});

export const createGlobalVital = create;
export const getGlobalVitals = getAll;
export const getGlobalVitalById = getById;
export const updateGlobalVital = updateById;
export const deleteGlobalVital = deleteById;

