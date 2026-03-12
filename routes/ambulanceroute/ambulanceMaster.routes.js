import express from "express";
import {
  createAmbulance,
  getAmbulances,
  getSingleAmbulance,
  updateAmbulance,
  deleteAmbulance
} from "../../controllers/ambulancecontroller/ambulanceMaster.controller.js";
import authMiddleware from "../../middlewares/auth.js";

const router = express.Router();

// Create ambulance
router.post("/", authMiddleware, createAmbulance);

// Get all ambulances with optional filters
router.get("/", authMiddleware, getAmbulances);

// Get single ambulance
router.get("/:id", authMiddleware, getSingleAmbulance);

// Update ambulance
router.put("/:id", authMiddleware, updateAmbulance);

// Delete ambulance
router.delete("/:id", authMiddleware, deleteAmbulance);

export default router;