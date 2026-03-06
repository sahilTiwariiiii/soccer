import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import {
  createCertificateTemplate,
  deleteCertificateTemplate,
  getCertificateTemplateById,
  getCertificateTemplates,
  updateCertificateTemplate,
} from "../../controllers/certificatescontroller/certificateTemplate.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createCertificateTemplate);
router.get("/", authMiddleware, getCertificateTemplates);
router.get("/:id", authMiddleware, getCertificateTemplateById);
router.put("/:id", authMiddleware, updateCertificateTemplate);
router.delete("/:id", authMiddleware, deleteCertificateTemplate);

export default router;

