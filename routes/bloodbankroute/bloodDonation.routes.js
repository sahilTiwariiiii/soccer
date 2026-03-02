// routes/bloodDonation.routes.js
import express from "express";
import {
  createBloodDonation,
  getAllBloodDonations,
  getBloodDonationById,
  updateBloodDonation,
  deleteBloodDonation,
} from "../controllers/bloodDonation.controller.js";



const router = express.Router();


router.post("/", createBloodDonation);
router.get("/", getAllBloodDonations);
router.get("/:id", getBloodDonationById);
router.put("/:id", updateBloodDonation);
router.delete("/:id", deleteBloodDonation);

export default router;