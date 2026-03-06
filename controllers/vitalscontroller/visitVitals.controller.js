import VisitVitals from "../../models/vitals/VisitVitals.js";
import { createCrudHandlers } from "../_shared/crudFactory.js";

const { create, getAll, getById, updateById, deleteById } = createCrudHandlers({
  Model: VisitVitals,
  scope: [],
});

export const createVisitVitals = create;
export const getVisitVitalsList = getAll;
export const getVisitVitalsById = getById;
export const updateVisitVitals = updateById;
export const deleteVisitVitals = deleteById;

