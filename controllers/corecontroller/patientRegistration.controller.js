import PatientRegistration from "../../models/PatientRegistration.js";
import { createCrudHandlers } from "../_shared/crudFactory.js";

const { create, getAll, getById, updateById, deleteById } = createCrudHandlers({
  Model: PatientRegistration,
  scope: [],
});

export const createPatientRegistration = create;
export const getPatientRegistrations = getAll;
export const getPatientRegistrationById = getById;
export const updatePatientRegistration = updateById;
export const deletePatientRegistration = deleteById;

