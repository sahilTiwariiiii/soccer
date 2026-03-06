import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import {
  createBreakdownTicket,
  deleteBreakdownTicket,
  getBreakdownTicketById,
  getBreakdownTickets,
  updateBreakdownTicket,
} from "../../controllers/equipmentmanagementcontroller/breakdownTicket.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createBreakdownTicket);
router.get("/", authMiddleware, getBreakdownTickets);
router.get("/:id", authMiddleware, getBreakdownTicketById);
router.put("/:id", authMiddleware, updateBreakdownTicket);
router.delete("/:id", authMiddleware, deleteBreakdownTicket);

export default router;

