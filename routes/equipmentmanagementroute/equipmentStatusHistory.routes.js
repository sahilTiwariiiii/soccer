import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import {
  createEquipmentStatusHistory,
  deleteEquipmentStatusHistory,
  getEquipmentStatusHistories,
  getEquipmentStatusHistoryById,
  updateEquipmentStatusHistory,
} from "../../controllers/equipmentmanagementcontroller/equipmentStatusHistory.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createEquipmentStatusHistory);
router.get("/", authMiddleware, getEquipmentStatusHistories);
router.get("/:id", authMiddleware, getEquipmentStatusHistoryById);
router.put("/:id", authMiddleware, updateEquipmentStatusHistory);
router.delete("/:id", authMiddleware, deleteEquipmentStatusHistory);

export default router;

