import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import {
  createAssetUsageLog,
  deleteAssetUsageLog,
  getAssetUsageLogById,
  getAssetUsageLogs,
  updateAssetUsageLog,
} from "../../controllers/assetmanagementcontroller/assetUsageLog.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createAssetUsageLog);
router.get("/", authMiddleware, getAssetUsageLogs);
router.get("/:id", authMiddleware, getAssetUsageLogById);
router.put("/:id", authMiddleware, updateAssetUsageLog);
router.delete("/:id", authMiddleware, deleteAssetUsageLog);

export default router;

