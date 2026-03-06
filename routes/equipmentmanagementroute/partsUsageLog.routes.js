import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import {
  createPartsUsageLog,
  deletePartsUsageLog,
  getPartsUsageLogById,
  getPartsUsageLogs,
  updatePartsUsageLog,
} from "../../controllers/equipmentmanagementcontroller/partsUsageLog.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createPartsUsageLog);
router.get("/", authMiddleware, getPartsUsageLogs);
router.get("/:id", authMiddleware, getPartsUsageLogById);
router.put("/:id", authMiddleware, updatePartsUsageLog);
router.delete("/:id", authMiddleware, deletePartsUsageLog);

export default router;

