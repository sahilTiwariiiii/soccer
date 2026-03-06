import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import {
  createPatientRegistration,
  deletePatientRegistration,
  getPatientRegistrationById,
  getPatientRegistrations,
  updatePatientRegistration,
} from "../../controllers/corecontroller/patientRegistration.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createPatientRegistration);
router.get("/", authMiddleware, getPatientRegistrations);
router.get("/:id", authMiddleware, getPatientRegistrationById);
router.put("/:id", authMiddleware, updatePatientRegistration);
router.delete("/:id", authMiddleware, deletePatientRegistration);

export default router;

