import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import {
  createMaintenanceLog,
  deleteMaintenanceLog,
  getMaintenanceLogById,
  getMaintenanceLogs,
  updateMaintenanceLog,
} from "../../controllers/equipmentmanagementcontroller/maintenanceLog.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createMaintenanceLog);
router.get("/", authMiddleware, getMaintenanceLogs);
router.get("/:id", authMiddleware, getMaintenanceLogById);
router.put("/:id", authMiddleware, updateMaintenanceLog);
router.delete("/:id", authMiddleware, deleteMaintenanceLog);

export default router;

