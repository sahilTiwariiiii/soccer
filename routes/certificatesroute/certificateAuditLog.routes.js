import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import {
  createCertificateAuditLog,
  deleteCertificateAuditLog,
  getCertificateAuditLogById,
  getCertificateAuditLogs,
  updateCertificateAuditLog,
} from "../../controllers/certificatescontroller/certificateAuditLog.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createCertificateAuditLog);
router.get("/", authMiddleware, getCertificateAuditLogs);
router.get("/:id", authMiddleware, getCertificateAuditLogById);
router.put("/:id", authMiddleware, updateCertificateAuditLog);
router.delete("/:id", authMiddleware, deleteCertificateAuditLog);

export default router;

