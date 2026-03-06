import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import {
  createEquipmentTransfer,
  deleteEquipmentTransfer,
  getEquipmentTransferById,
  getEquipmentTransfers,
  updateEquipmentTransfer,
} from "../../controllers/equipmentmanagementcontroller/equipmentTransfer.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createEquipmentTransfer);
router.get("/", authMiddleware, getEquipmentTransfers);
router.get("/:id", authMiddleware, getEquipmentTransferById);
router.put("/:id", authMiddleware, updateEquipmentTransfer);
router.delete("/:id", authMiddleware, deleteEquipmentTransfer);

export default router;

