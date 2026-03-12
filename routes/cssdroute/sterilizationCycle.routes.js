import express from "express";
import authMiddleware from "../middlewares/auth.js";
import {
  createSterilizationCycle,
  updateSterilizationCycle,
  getSterilizationCycles,
  getSingleSterilizationCycle,
  deleteSterilizationCycle,
} from "../controllers/sterilizationCycle.controller.js";


const router = express.Router();

// Create cycle
router.post("/", authMiddleware, createSterilizationCycle);

// Update cycle
router.put("/:id", authMiddleware, updateSterilizationCycle);

// Get all cycles with filters
router.get("/", authMiddleware, getSterilizationCycles);

// Get single cycle
router.get("/:id", authMiddleware, getSingleSterilizationCycle);

// Delete cycle
router.delete("/:id", authMiddleware, deleteSterilizationCycle);

export default router;