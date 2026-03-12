import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
  updateAppointmentStatus,
  cancelAppointment,
  deleteAppointment
} from "../../controllers/appointmentandschedulingcontroller/appointment.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createAppointment);
router.get("/", authMiddleware, getAllAppointments);
router.get("/:id", authMiddleware, getAppointmentById);
router.put("/:id", authMiddleware, updateAppointment);
router.patch("/:id/status", authMiddleware, updateAppointmentStatus);
router.patch("/:id/cancel", authMiddleware, cancelAppointment);
router.delete("/:id", authMiddleware, deleteAppointment);

export default router;