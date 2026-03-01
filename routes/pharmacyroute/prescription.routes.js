import express from "express";
import prescriptionController from "../controllers/prescription.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, prescriptionController.createPrescription);
router.get("/", authMiddleware, prescriptionController.getPrescriptions);
router.get("/:id", authMiddleware, prescriptionController.getPrescriptionById);
router.patch("/:id/send", authMiddleware, prescriptionController.sendToPharmacy);
router.patch("/:id/dispense", authMiddleware, prescriptionController.markAsDispensed);
router.patch("/:id/cancel", authMiddleware, prescriptionController.cancelPrescription);

export default router;