import catchAsync from "../_shared/catchAsync.js";
import BreakdownTicket from "../../models/equipmentmanagement/BreakdownTicketSchema.js";
import { createCrudHandlers } from "../_shared/crudFactory.js";

const scope = [
  { tokenKey: "hospitalId", modelField: "hospitalId" },
  { tokenKey: "branchId", modelField: "branchId" },
];

const { create, getAll, getById, updateById, deleteById } = createCrudHandlers({
  Model: BreakdownTicket,
  scope,
  populate: "equipmentId reportedBy",
});

export const createBreakdownTicket = create;
export const getBreakdownTickets = getAll;
export const getBreakdownTicketById = getById;
export const updateBreakdownTicket = updateById;
export const deleteBreakdownTicket = deleteById;

