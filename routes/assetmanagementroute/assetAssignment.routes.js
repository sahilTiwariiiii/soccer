import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import {
  createAssetAssignment,
  deleteAssetAssignment,
  getAssetAssignmentById,
  getAssetAssignments,
  updateAssetAssignment,
} from "../../controllers/assetmanagementcontroller/assetAssignment.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createAssetAssignment);
router.get("/", authMiddleware, getAssetAssignments);
router.get("/:id", authMiddleware, getAssetAssignmentById);
router.put("/:id", authMiddleware, updateAssetAssignment);
router.delete("/:id", authMiddleware, deleteAssetAssignment);

export default router;

