import express from "express";
import { registerPatient, findPatient, listVisits } from "../controllers/patientRegistration.controller.js";
import authMiddleware from "../middlewares/auth.js";

const router = express.Router();

router.get("/find", authMiddleware, findPatient);
router.post("/register", authMiddleware, registerPatient);
router.get("/visits", authMiddleware, listVisits);

export default router;