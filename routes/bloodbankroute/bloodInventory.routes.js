// routes/bloodInventory.routes.js
import express from "express";
import {
  createBloodInventory,
  getAllBloodInventory,
  getBloodInventoryById,
  updateBloodInventory,
  updateBloodInventoryStatus,
  deleteBloodInventory,
} from "../controllers/bloodInventory.controller.js";



const router = express.Router();



// Add to inventory
router.post("/", createBloodInventory);

// Get all with filters
router.get("/", getAllBloodInventory);

// Get single
router.get("/:id", getBloodInventoryById);

// Update full
router.put("/:id", updateBloodInventory);

// Update status only
router.patch("/:id/status", updateBloodInventoryStatus);

// Delete
router.delete("/:id", deleteBloodInventory);

export default router;