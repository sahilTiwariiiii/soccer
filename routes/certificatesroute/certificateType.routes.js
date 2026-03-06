import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import {
  createCertificateType,
  deleteCertificateType,
  getCertificateTypeById,
  getCertificateTypes,
  updateCertificateType,
} from "../../controllers/certificatescontroller/certificateType.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createCertificateType);
router.get("/", authMiddleware, getCertificateTypes);
router.get("/:id", authMiddleware, getCertificateTypeById);
router.put("/:id", authMiddleware, updateCertificateType);
router.delete("/:id", authMiddleware, deleteCertificateType);

export default router;

