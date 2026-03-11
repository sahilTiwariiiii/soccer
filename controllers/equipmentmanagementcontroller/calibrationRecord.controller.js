import CalibrationRecord from "../../models/equipmentmanagement/CalibrationRecordSchema.js";
import { createCrudHandlers } from "../_shared/crudFactory.js";

const scope = [
  { tokenKey: "hospitalId", modelField: "hospitalId" },
  { tokenKey: "branchId", modelField: "branchId" },
];

const { create, getAll, getById, updateById, deleteById } = createCrudHandlers({
  Model: CalibrationRecord,
  scope,
  populate: "equipmentId",
});

export const createCalibrationRecord = create;
export const getCalibrationRecords = getAll;
export const getCalibrationRecordById = getById;
export const updateCalibrationRecord = updateById;
export const deleteCalibrationRecord = deleteById;

