import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import {
  createBloodComponent,
  getAllBloodComponents,
  getBloodComponentById,
  updateBloodComponent,
  updateBloodComponentStatus,
  deleteBloodComponent,
} from "../../controllers/bloodbankcontroller/bloodComponent.controller.js";



const router = express.Router();
;

// Create
router.post("/", authMiddleware, createBloodComponent);

// Get All (with filters)
router.get("/", authMiddleware, getAllBloodComponents);

// Get Single
router.get("/:id", authMiddleware, getBloodComponentById);

// Update Full
router.put("/:id", authMiddleware, updateBloodComponent);

// Update Status Only
router.patch("/:id/status", authMiddleware, updateBloodComponentStatus);

// Delete
router.delete("/:id", authMiddleware, deleteBloodComponent);

export default router;