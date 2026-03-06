import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import {
  createAssetCategory,
  deleteAssetCategory,
  getAssetCategories,
  getAssetCategoryById,
  updateAssetCategory,
} from "../../controllers/assetmanagementcontroller/assetCategory.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createAssetCategory);
router.get("/", authMiddleware, getAssetCategories);
router.get("/:id", authMiddleware, getAssetCategoryById);
router.put("/:id", authMiddleware, updateAssetCategory);
router.delete("/:id", authMiddleware, deleteAssetCategory);

export default router;

