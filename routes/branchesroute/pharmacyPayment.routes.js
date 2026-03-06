import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import {
  createPharmacyPayment,
  deletePharmacyPayment,
  getPharmacyPaymentById,
  getPharmacyPayments,
  updatePharmacyPayment,
} from "../../controllers/branchescontroller/pharmacyPayment.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createPharmacyPayment);
router.get("/", authMiddleware, getPharmacyPayments);
router.get("/:id", authMiddleware, getPharmacyPaymentById);
router.put("/:id", authMiddleware, updatePharmacyPayment);
router.delete("/:id", authMiddleware, deletePharmacyPayment);

export default router;

