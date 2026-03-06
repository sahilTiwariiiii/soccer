import Country from "../../models/Country.js";
import { createCrudHandlers } from "../_shared/crudFactory.js";

const { create, getAll, getById, updateById, deleteById } = createCrudHandlers({
  Model: Country,
  scope: [],
});

export const createCountry = create;
export const getCountries = getAll;
export const getCountryById = getById;
export const updateCountry = updateById;
export const deleteCountry = deleteById;

