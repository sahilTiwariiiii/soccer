import express from "express";
import {
  createPharmacy,
  getPharmacies,
  getPharmacyById,
  updatePharmacy,
  togglePharmacyStatus
} from "../../controllers/pharmacycontroller/pharmacy.controller.js";



const router = express.Router();

// CRUD + toggle routes
router.post("/", createPharmacy);
router.get("/", getPharmacies);
router.get("/:id", getPharmacyById);
router.put("/:id", updatePharmacy);
router.patch("/:id/status", togglePharmacyStatus);

export default router;