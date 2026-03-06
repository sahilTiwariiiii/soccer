import Hospital from "../../models/hospital/HospitalSchema.js";
import { createCrudHandlers } from "../_shared/crudFactory.js";

const { create, getAll, getById, updateById, deleteById } = createCrudHandlers({
  Model: Hospital,
  scope: [],
});

export const createHospital = create;
export const getHospitals = getAll;
export const getHospitalById = getById;
export const updateHospital = updateById;
export const deleteHospital = deleteById;

