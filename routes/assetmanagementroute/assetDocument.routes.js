import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import {
  createAssetDocument,
  deleteAssetDocument,
  getAssetDocumentById,
  getAssetDocuments,
  updateAssetDocument,
} from "../../controllers/assetmanagementcontroller/assetDocument.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createAssetDocument);
router.get("/", authMiddleware, getAssetDocuments);
router.get("/:id", authMiddleware, getAssetDocumentById);
router.put("/:id", authMiddleware, updateAssetDocument);
router.delete("/:id", authMiddleware, deleteAssetDocument);

export default router;

