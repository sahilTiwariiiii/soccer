import express from "express";
import {
  createMaintenance,
  updateMaintenance,
  getMaintenances,
  getSingleMaintenance,
  deleteMaintenance
} from "../../controllers/ambulancecontroller/ambulanceMaintenance.controller.js";
import authMiddleware from "../../middlewares/auth.js";

const router = express.Router();

// Create maintenance record
router.post("/", authMiddleware, createMaintenance);

// Update maintenance record
router.put("/:id", authMiddleware, updateMaintenance);

// Get all maintenance records with optional filters
router.get("/", authMiddleware, getMaintenances);

// Get single maintenance record
router.get("/:id", authMiddleware, getSingleMaintenance);

// Delete maintenance record
router.delete("/:id", authMiddleware, deleteMaintenance);

export default router;