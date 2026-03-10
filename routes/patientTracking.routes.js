import express from "express";
import { getOPDPatients, getIPDPatients } from "../controllers/patientTracking.controller.js";
import authMiddleware from "../middlewares/auth.js";

const router = express.Router();

/**
 * @route GET /api/v1/patients/tracking/opd
 * @desc Get all OPD patients (with filters)
 * @access Private
 */
router.get("/tracking/opd", authMiddleware, getOPDPatients);

/**
 * @route GET /api/v1/patients/tracking/ipd
 * @desc Get all IPD patients (Currently admitted or discharged)
 * @access Private
 */
router.get("/tracking/ipd", authMiddleware, getIPDPatients);

export default router;
