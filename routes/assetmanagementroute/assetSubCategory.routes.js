import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import {
  createAssetSubCategory,
  deleteAssetSubCategory,
  getAssetSubCategories,
  getAssetSubCategoryById,
  updateAssetSubCategory,
} from "../../controllers/assetmanagementcontroller/assetSubCategory.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createAssetSubCategory);
router.get("/", authMiddleware, getAssetSubCategories);
router.get("/:id", authMiddleware, getAssetSubCategoryById);
router.put("/:id", authMiddleware, updateAssetSubCategory);
router.delete("/:id", authMiddleware, deleteAssetSubCategory);

export default router;

