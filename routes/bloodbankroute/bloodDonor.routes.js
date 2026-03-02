// routes/bloodDonor.routes.js
import express from "express";
import {
  createBloodDonor,
  getAllBloodDonors,
  getBloodDonorById,
  updateBloodDonor,
  deleteBloodDonor,
} from "../controllers/bloodDonor.controller.js";

import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

// Create
router.post("/", createBloodDonor);

// Get All (Filters Supported)
router.get("/", getAllBloodDonors);

// Get By ID
router.get("/:id", getBloodDonorById);

// Update
router.put("/:id", updateBloodDonor);

// Delete
router.delete("/:id", deleteBloodDonor);

export default router;