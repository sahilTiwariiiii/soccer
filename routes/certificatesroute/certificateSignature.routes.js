import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import {
  createCertificateSignature,
  deleteCertificateSignature,
  getCertificateSignatureById,
  getCertificateSignatures,
  updateCertificateSignature,
} from "../../controllers/certificatescontroller/certificateSignature.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createCertificateSignature);
router.get("/", authMiddleware, getCertificateSignatures);
router.get("/:id", authMiddleware, getCertificateSignatureById);
router.put("/:id", authMiddleware, updateCertificateSignature);
router.delete("/:id", authMiddleware, deleteCertificateSignature);

export default router;

