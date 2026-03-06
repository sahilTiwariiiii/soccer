import City from "../../models/City.js";
import { createCrudHandlers } from "../_shared/crudFactory.js";

const { create, getAll, getById, updateById, deleteById } = createCrudHandlers({
  Model: City,
  scope: [],
});

export const createCity = create;
export const getCities = getAll;
export const getCityById = getById;
export const updateCity = updateById;
export const deleteCity = deleteById;

