import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import {
  createEquipmentUsageLog,
  deleteEquipmentUsageLog,
  getEquipmentUsageLogById,
  getEquipmentUsageLogs,
  updateEquipmentUsageLog,
} from "../../controllers/equipmentmanagementcontroller/equipmentUsageLog.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createEquipmentUsageLog);
router.get("/", authMiddleware, getEquipmentUsageLogs);
router.get("/:id", authMiddleware, getEquipmentUsageLogById);
router.put("/:id", authMiddleware, updateEquipmentUsageLog);
router.delete("/:id", authMiddleware, deleteEquipmentUsageLog);

export default router;

