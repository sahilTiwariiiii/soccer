import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import {
  createGeneratedCertificate,
  deleteGeneratedCertificate,
  getGeneratedCertificateById,
  getGeneratedCertificates,
  updateGeneratedCertificate,
} from "../../controllers/certificatescontroller/generatedCertificate.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createGeneratedCertificate);
router.get("/", authMiddleware, getGeneratedCertificates);
router.get("/:id", authMiddleware, getGeneratedCertificateById);
router.put("/:id", authMiddleware, updateGeneratedCertificate);
router.delete("/:id", authMiddleware, deleteGeneratedCertificate);

export default router;

