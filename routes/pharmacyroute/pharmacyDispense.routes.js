import express from "express";
import {
  createPharmacyDispense,
  getPharmacyDispenses,
  getPharmacyDispenseById,
  updatePharmacyDispense,
  deletePharmacyDispense
} from "../controllers/pharmacyDispense.controller.js";


const router = express.Router();


// CRUD routes
router.post("/", createPharmacyDispense);
router.get("/", getPharmacyDispenses);
router.get("/:id", getPharmacyDispenseById);
router.put("/:id", updatePharmacyDispense);
router.delete("/:id", deletePharmacyDispense);

export default router;