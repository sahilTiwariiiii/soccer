import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import {
  createAssetMaintenance,
  deleteAssetMaintenance,
  getAssetMaintenanceById,
  getAssetMaintenances,
  updateAssetMaintenance,
} from "../../controllers/assetmanagementcontroller/assetMaintenance.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createAssetMaintenance);
router.get("/", authMiddleware, getAssetMaintenances);
router.get("/:id", authMiddleware, getAssetMaintenanceById);
router.put("/:id", authMiddleware, updateAssetMaintenance);
router.delete("/:id", authMiddleware, deleteAssetMaintenance);

export default router;

