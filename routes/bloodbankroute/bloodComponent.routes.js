// routes/bloodComponent.routes.js
import express from "express";
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
router.post("/", createBloodComponent);

// Get All (with filters)
router.get("/", getAllBloodComponents);

// Get Single
router.get("/:id", getBloodComponentById);

// Update Full
router.put("/:id", updateBloodComponent);

// Update Status Only
router.patch("/:id/status", updateBloodComponentStatus);

// Delete
router.delete("/:id", deleteBloodComponent);

export default router;