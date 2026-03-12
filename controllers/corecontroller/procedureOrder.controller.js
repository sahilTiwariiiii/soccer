import asyncHandler from "express-async-handler";
import { createCrudHandlers } from "../_shared/handlerFactory.js";
import ProcedureOrder from "../../models/ProcedureOrder.js";

const scope = [
  { tokenKey: "hospitalId", modelField: "hospitalId" },
  { tokenKey: "branchId", modelField: "branchId" },
];

const { create, getAll, getById, updateById, deleteById } = createCrudHandlers({
  Model: ProcedureOrder,
  scope,
});

export const createProcedureOrder = create;
export const getProcedureOrders = getAll;
export const getProcedureOrderById = getById;
export const updateProcedureOrder = updateById;
export const deleteProcedureOrder = deleteById;

