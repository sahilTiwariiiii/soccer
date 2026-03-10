import express from "express";
import { createPatientVisit } from "../controllers/patientVisit.controller.js";
import authMiddleware from "../middlewares/auth.js";

const router = express.Router();

router.post("/visits", authMiddleware, createPatientVisit);

export default router;