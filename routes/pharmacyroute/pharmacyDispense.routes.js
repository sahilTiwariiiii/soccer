import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import {
  createPharmacyDispense,
  getPharmacyDispenses,
  getPharmacyDispenseById,
  updatePharmacyDispense,
  deletePharmacyDispense
} from "../../controllers/pharmacycontroller/pharmacyDispense.controller.js";


const router = express.Router();


// CRUD routes
router.post("/", authMiddleware, createPharmacyDispense);
router.get("/", authMiddleware, getPharmacyDispenses);
router.get("/:id", authMiddleware, getPharmacyDispenseById);
router.put("/:id", authMiddleware, updatePharmacyDispense);
router.delete("/:id", authMiddleware, deletePharmacyDispense);

export default router;