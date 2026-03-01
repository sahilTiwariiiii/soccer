import express from "express";
import {
  createInsuranceClaim,
  getInsuranceClaims,
  getInsuranceClaimById,
  updateInsuranceClaim,
  approveInsuranceClaim,
  rejectInsuranceClaim,
  markClaimSettled
} from "../controllers/insuranceClaim.controller.js";



const router = express.Router();


// CRUD + workflow routes
router.post("/", createInsuranceClaim);
router.get("/", getInsuranceClaims);
router.get("/:id", getInsuranceClaimById);
router.put("/:id", updateInsuranceClaim);
router.patch("/:id/approve", approveInsuranceClaim);
router.patch("/:id/reject", rejectInsuranceClaim);
router.patch("/:id/settle", markClaimSettled);

export default router;