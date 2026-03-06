import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import {
  createProcedureOrder,
  deleteProcedureOrder,
  getProcedureOrderById,
  getProcedureOrders,
  updateProcedureOrder,
} from "../../controllers/corecontroller/procedureOrder.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createProcedureOrder);
router.get("/", authMiddleware, getProcedureOrders);
router.get("/:id", authMiddleware, getProcedureOrderById);
router.put("/:id", authMiddleware, updateProcedureOrder);
router.delete("/:id", authMiddleware, deleteProcedureOrder);

export default router;

