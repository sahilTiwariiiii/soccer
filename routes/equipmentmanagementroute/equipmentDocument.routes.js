import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import {
  createEquipmentDocument,
  deleteEquipmentDocument,
  getEquipmentDocumentById,
  getEquipmentDocuments,
  updateEquipmentDocument,
} from "../../controllers/equipmentmanagementcontroller/equipmentDocument.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createEquipmentDocument);
router.get("/", authMiddleware, getEquipmentDocuments);
router.get("/:id", authMiddleware, getEquipmentDocumentById);
router.put("/:id", authMiddleware, updateEquipmentDocument);
router.delete("/:id", authMiddleware, deleteEquipmentDocument);

export default router;

