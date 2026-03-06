import State from "../../models/State.js";
import { createCrudHandlers } from "../_shared/crudFactory.js";

const { create, getAll, getById, updateById, deleteById } = createCrudHandlers({
  Model: State,
  scope: [],
});

export const createState = create;
export const getStates = getAll;
export const getStateById = getById;
export const updateState = updateById;
export const deleteState = deleteById;

