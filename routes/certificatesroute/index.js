import express from "express";

import certificateTypeRoutes from "./certificateType.routes.js";
import certificateTemplateRoutes from "./certificateTemplate.routes.js";
import certificateFieldRoutes from "./certificateField.routes.js";
import certificateSignatureRoutes from "./certificateSignature.routes.js";
import certificateVerificationRoutes from "./certificateVerification.routes.js";
import certificateAuditLogRoutes from "./certificateAuditLog.routes.js";
import generatedCertificateRoutes from "./generatedCertificate.routes.js";

const router = express.Router();

router.use("/types", certificateTypeRoutes);
router.use("/templates", certificateTemplateRoutes);
router.use("/fields", certificateFieldRoutes);
router.use("/signatures", certificateSignatureRoutes);
router.use("/verifications", certificateVerificationRoutes);
router.use("/audit-logs", certificateAuditLogRoutes);
router.use("/generated", generatedCertificateRoutes);

export default router;

