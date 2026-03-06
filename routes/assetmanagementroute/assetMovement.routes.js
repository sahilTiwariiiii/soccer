import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import {
  createAssetMovement,
  deleteAssetMovement,
  getAssetMovementById,
  getAssetMovements,
  updateAssetMovement,
} from "../../controllers/assetmanagementcontroller/assetMovement.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createAssetMovement);
router.get("/", authMiddleware, getAssetMovements);
router.get("/:id", authMiddleware, getAssetMovementById);
router.put("/:id", authMiddleware, updateAssetMovement);
router.delete("/:id", authMiddleware, deleteAssetMovement);

export default router;

