import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import {
  createAssetVendor,
  deleteAssetVendor,
  getAssetVendorById,
  getAssetVendors,
  updateAssetVendor,
} from "../../controllers/assetmanagementcontroller/assetVendor.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createAssetVendor);
router.get("/", authMiddleware, getAssetVendors);
router.get("/:id", authMiddleware, getAssetVendorById);
router.put("/:id", authMiddleware, updateAssetVendor);
router.delete("/:id", authMiddleware, deleteAssetVendor);

export default router;

