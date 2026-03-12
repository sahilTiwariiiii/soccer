// routes/bloodRequest.routes.js
import express from "express";
import {
  createBloodRequest,
  getAllBloodRequests,
  getBloodRequestById,
  updateBloodRequest,
  updateBloodRequestStatus,
  deleteBloodRequest,
} from "../../controllers/bloodbankcontroller/bloodRequest.controller.js";



const router = express.Router();



// Create request
router.post("/", createBloodRequest);

// Get all with filters
router.get("/", getAllBloodRequests);

// Get single
router.get("/:id", getBloodRequestById);

// Update full
router.put("/:id", updateBloodRequest);

// Update status only
router.patch("/:id/status", updateBloodRequestStatus);

// Delete
router.delete("/:id", deleteBloodRequest);

export default router;