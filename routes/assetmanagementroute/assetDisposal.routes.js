import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import {
  createAssetDisposal,
  deleteAssetDisposal,
  getAssetDisposalById,
  getAssetDisposals,
  updateAssetDisposal,
} from "../../controllers/assetmanagementcontroller/assetDisposal.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createAssetDisposal);
router.get("/", authMiddleware, getAssetDisposals);
router.get("/:id", authMiddleware, getAssetDisposalById);
router.put("/:id", authMiddleware, updateAssetDisposal);
router.delete("/:id", authMiddleware, deleteAssetDisposal);

export default router;

