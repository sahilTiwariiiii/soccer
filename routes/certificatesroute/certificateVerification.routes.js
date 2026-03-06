import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import {
  createCertificateVerification,
  deleteCertificateVerification,
  getCertificateVerificationById,
  getCertificateVerifications,
  updateCertificateVerification,
} from "../../controllers/certificatescontroller/certificateVerification.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createCertificateVerification);
router.get("/", authMiddleware, getCertificateVerifications);
router.get("/:id", authMiddleware, getCertificateVerificationById);
router.put("/:id", authMiddleware, updateCertificateVerification);
router.delete("/:id", authMiddleware, deleteCertificateVerification);

export default router;

