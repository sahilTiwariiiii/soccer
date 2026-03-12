import Receipt from "../../models/PatientReceipt.js";
import { createCrudHandlers } from "../_shared/crudFactory.js";

const { create, getAll, getById, updateById, deleteById } = createCrudHandlers({
  Model: Receipt,
  scope: [
    { path: "patientId", select: "patientName uhid age gender" },
    { path: "doctorId", select: "name" },
    { path: "departmentId", select: "name" },
  ],
  sort: { createdAt: -1 },
});

export const createReceipt = create;
export const getReceipts = getAll;
export const getReceiptById = getById;
export const updateReceipt = updateById;
export const deleteReceipt = deleteById;

