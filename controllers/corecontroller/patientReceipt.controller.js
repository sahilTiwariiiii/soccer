import Receipt from "../../models/PatientReceipt.js";
import { createCrudHandlers } from "../_shared/crudFactory.js";

const { create, getAll, getById, updateById, deleteById } = createCrudHandlers({
  Model: Receipt,
  scope: [],
});

export const createReceipt = create;
export const getReceipts = getAll;
export const getReceiptById = getById;
export const updateReceipt = updateById;
export const deleteReceipt = deleteById;

