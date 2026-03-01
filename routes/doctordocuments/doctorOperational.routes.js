import express from "express";
import {
  createDoctorOperational,
  getAllDoctorOperational,
  getDoctorOperationalById,
  updateDoctorOperational,
  deleteDoctorOperational,
  addSchedule,
  addLeave,
  updateLeaveStatus
} from "../controllers/doctorOperational.controller.js";

const router = express.Router();

// Create
router.post("/", createDoctorOperational);

// Get All (filters + pagination)
router.get("/", getAllDoctorOperational);

// Get By ID
router.get("/:id", getDoctorOperationalById);

// Update Full
router.put("/:id", updateDoctorOperational);

// Add Schedule
router.post("/:id/schedule", addSchedule);

// Add Leave
router.post("/:id/leave", addLeave);

// Update Leave Status
router.patch("/:id/leave/:leaveId/status", updateLeaveStatus);

// Delete
router.delete("/:id", deleteDoctorOperational);

export default router;