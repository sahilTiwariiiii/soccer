import express from "express";
import prescriptionItemController from "../controllers/prescriptionItemController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes are protected
router.use(authMiddleware);

router.post("/", prescriptionItemController.createPrescriptionItem);
router.get("/", prescriptionItemController.getPrescriptionItems);
router.get("/:id", prescriptionItemController.getPrescriptionItemById);
router.put("/dispense/:id", prescriptionItemController.markItemAsDispensed);
router.delete("/:id", prescriptionItemController.deletePrescriptionItem);

export default router;