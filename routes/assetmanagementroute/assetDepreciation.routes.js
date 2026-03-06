import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import {
  createAssetDepreciation,
  deleteAssetDepreciation,
  getAssetDepreciationById,
  getAssetDepreciations,
  updateAssetDepreciation,
} from "../../controllers/assetmanagementcontroller/assetDepreciation.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createAssetDepreciation);
router.get("/", authMiddleware, getAssetDepreciations);
router.get("/:id", authMiddleware, getAssetDepreciationById);
router.put("/:id", authMiddleware, updateAssetDepreciation);
router.delete("/:id", authMiddleware, deleteAssetDepreciation);

export default router;

