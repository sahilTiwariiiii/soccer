import express from "express";
import {
  createAmbulanceTrip,
  updateTripStatus,
  getAmbulanceTrips,
  getSingleAmbulanceTrip,
  deleteAmbulanceTrip
} from "../controllers/ambulanceTrip.controller.js";
import authMiddleware from "../middlewares/auth.js";

const router = express.Router();

// Create new trip
router.post("/", authMiddleware, createAmbulanceTrip);

// Update trip status/timestamps
router.put("/:id", authMiddleware, updateTripStatus);

// Get all trips with optional filters
router.get("/", authMiddleware, getAmbulanceTrips);

// Get single trip
router.get("/:id", authMiddleware, getSingleAmbulanceTrip);

// Delete trip (optional)
router.delete("/:id", authMiddleware, deleteAmbulanceTrip);

export default router;