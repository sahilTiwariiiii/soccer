import express from "express";

import appointmentRoutes from "./appointment.routes.js";
import doctorAvailabilityRoutes from "./doctorAvailability.routes.js";

const router = express.Router();

router.use("/appointments", appointmentRoutes);
router.use("/doctor-availability", doctorAvailabilityRoutes);

export default router;
