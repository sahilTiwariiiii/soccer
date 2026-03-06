import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import {
  createEquipment,
  deleteEquipment,
  getEquipmentById,
  getEquipments,
  updateEquipment,
} from "../../controllers/equipmentmanagementcontroller/equipment.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createEquipment);
router.get("/", authMiddleware, getEquipments);
router.get("/:id", authMiddleware, getEquipmentById);
router.put("/:id", authMiddleware, updateEquipment);
router.delete("/:id", authMiddleware, deleteEquipment);

export default router;

