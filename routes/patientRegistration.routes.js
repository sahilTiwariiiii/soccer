import express from "express";
import { registerPatient, findPatient, listVisits, getPatients } from "../controllers/patientRegistration.controller.js";
import authMiddleware from "../middlewares/auth.js";

const router = express.Router();

router.get("/", authMiddleware, getPatients);
router.get("/find", authMiddleware, findPatient);
router.post("/register", authMiddleware, registerPatient);
router.get("/visits", authMiddleware, listVisits);

export default router;