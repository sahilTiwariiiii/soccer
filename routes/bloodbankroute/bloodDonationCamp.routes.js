// routes/bloodDonationCamp.routes.js
import express from "express";
import {
  createBloodDonationCamp,
  getAllBloodDonationCamps,
  getBloodDonationCampById,
  updateBloodDonationCamp,
  deleteBloodDonationCamp,
} from "../controllers/bloodDonationCamp.controller.js";



const router = express.Router();



// Create
router.post("/", createBloodDonationCamp);

// Get All (Filters Supported)
router.get("/", getAllBloodDonationCamps);

// Get By ID
router.get("/:id", getBloodDonationCampById);

// Update
router.put("/:id", updateBloodDonationCamp);

// Delete
router.delete("/:id", deleteBloodDonationCamp);

export default router;