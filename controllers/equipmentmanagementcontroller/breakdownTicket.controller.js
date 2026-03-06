import BreakdownTicket from "../../models/equipmentmanagement/BreakdownTicketSchema.js";
import { createCrudHandlers } from "../_shared/crudFactory.js";

const scope = [
  { tokenKey: "hospitalId", modelField: "hospitalId" },
  { tokenKey: "branchId", modelField: "branchId" },
];

const { create, getAll, getById, updateById, deleteById } = createCrudHandlers({
  Model: BreakdownTicket,
  scope,
});

export const createBreakdownTicket = create;
export const getBreakdownTickets = getAll;
export const getBreakdownTicketById = getById;
export const updateBreakdownTicket = updateById;
export const deleteBreakdownTicket = deleteById;

