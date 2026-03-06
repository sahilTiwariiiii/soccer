import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import {
  createAssetAudit,
  deleteAssetAudit,
  getAssetAuditById,
  getAssetAudits,
  updateAssetAudit,
} from "../../controllers/assetmanagementcontroller/assetAudit.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createAssetAudit);
router.get("/", authMiddleware, getAssetAudits);
router.get("/:id", authMiddleware, getAssetAuditById);
router.put("/:id", authMiddleware, updateAssetAudit);
router.delete("/:id", authMiddleware, deleteAssetAudit);

export default router;

