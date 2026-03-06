import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import {
  createAlert,
  deleteAlert,
  getAlertById,
  getAlerts,
  updateAlert,
} from "../../controllers/equipmentmanagementcontroller/alert.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createAlert);
router.get("/", authMiddleware, getAlerts);
router.get("/:id", authMiddleware, getAlertById);
router.put("/:id", authMiddleware, updateAlert);
router.delete("/:id", authMiddleware, deleteAlert);

export default router;

