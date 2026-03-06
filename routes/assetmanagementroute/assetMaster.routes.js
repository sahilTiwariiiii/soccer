import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import {
  createAssetMaster,
  deleteAssetMaster,
  getAssetMasterById,
  getAssetMasters,
  updateAssetMaster,
} from "../../controllers/assetmanagementcontroller/assetMaster.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createAssetMaster);
router.get("/", authMiddleware, getAssetMasters);
router.get("/:id", authMiddleware, getAssetMasterById);
router.put("/:id", authMiddleware, updateAssetMaster);
router.delete("/:id", authMiddleware, deleteAssetMaster);

export default router;

