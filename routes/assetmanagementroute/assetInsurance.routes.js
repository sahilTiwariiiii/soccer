import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import {
  createAssetInsurance,
  deleteAssetInsurance,
  getAssetInsuranceById,
  getAssetInsurances,
  updateAssetInsurance,
} from "../../controllers/assetmanagementcontroller/assetInsurance.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createAssetInsurance);
router.get("/", authMiddleware, getAssetInsurances);
router.get("/:id", authMiddleware, getAssetInsuranceById);
router.put("/:id", authMiddleware, updateAssetInsurance);
router.delete("/:id", authMiddleware, deleteAssetInsurance);

export default router;

