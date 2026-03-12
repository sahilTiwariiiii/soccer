import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import {
  createDoctorAvailability,
  getAllDoctorAvailability,
  getDoctorAvailabilityById,
  updateDoctorAvailability,
  toggleAvailabilityStatus,
  deleteDoctorAvailability
} from "../../controllers/appointmentandschedulingcontroller/doctorAvailability.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createDoctorAvailability);
router.get("/", authMiddleware, getAllDoctorAvailability);
router.get("/:id", authMiddleware, getDoctorAvailabilityById);
router.put("/:id", authMiddleware, updateDoctorAvailability);
router.patch("/:id/toggle-status", authMiddleware, toggleAvailabilityStatus);
router.delete("/:id", authMiddleware, deleteDoctorAvailability);

export default router;