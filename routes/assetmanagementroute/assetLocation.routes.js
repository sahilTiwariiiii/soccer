import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import {
  createAssetLocation,
  deleteAssetLocation,
  getAssetLocationById,
  getAssetLocations,
  updateAssetLocation,
} from "../../controllers/assetmanagementcontroller/assetLocation.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createAssetLocation);
router.get("/", authMiddleware, getAssetLocations);
router.get("/:id", authMiddleware, getAssetLocationById);
router.put("/:id", authMiddleware, updateAssetLocation);
router.delete("/:id", authMiddleware, deleteAssetLocation);

export default router;

