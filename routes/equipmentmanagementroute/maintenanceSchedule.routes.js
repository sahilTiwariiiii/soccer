import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import {
  createMaintenanceSchedule,
  deleteMaintenanceSchedule,
  getMaintenanceScheduleById,
  getMaintenanceSchedules,
  updateMaintenanceSchedule,
} from "../../controllers/equipmentmanagementcontroller/maintenanceSchedule.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createMaintenanceSchedule);
router.get("/", authMiddleware, getMaintenanceSchedules);
router.get("/:id", authMiddleware, getMaintenanceScheduleById);
router.put("/:id", authMiddleware, updateMaintenanceSchedule);
router.delete("/:id", authMiddleware, deleteMaintenanceSchedule);

export default router;

