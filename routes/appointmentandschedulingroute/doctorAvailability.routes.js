import express from "express";
import {
  createDoctorAvailability,
  getAllDoctorAvailability,
  getDoctorAvailabilityById,
  updateDoctorAvailability,
  toggleAvailabilityStatus,
  deleteDoctorAvailability
} from "../controllers/doctorAvailability.controller.js";

const router = express.Router();

router.post("/", createDoctorAvailability);
router.get("/", getAllDoctorAvailability);
router.get("/:id", getDoctorAvailabilityById);
router.put("/:id", updateDoctorAvailability);
router.patch("/:id/toggle-status", toggleAvailabilityStatus);
router.delete("/:id", deleteDoctorAvailability);

export default router;