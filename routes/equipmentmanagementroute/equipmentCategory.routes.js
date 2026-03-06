import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import {
  createEquipmentCategory,
  deleteEquipmentCategory,
  getEquipmentCategories,
  getEquipmentCategoryById,
  updateEquipmentCategory,
} from "../../controllers/equipmentmanagementcontroller/equipmentCategory.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createEquipmentCategory);
router.get("/", authMiddleware, getEquipmentCategories);
router.get("/:id", authMiddleware, getEquipmentCategoryById);
router.put("/:id", authMiddleware, updateEquipmentCategory);
router.delete("/:id", authMiddleware, deleteEquipmentCategory);

export default router;

