import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import {
  createCertificateField,
  deleteCertificateField,
  getCertificateFieldById,
  getCertificateFields,
  updateCertificateField,
} from "../../controllers/certificatescontroller/certificateField.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createCertificateField);
router.get("/", authMiddleware, getCertificateFields);
router.get("/:id", authMiddleware, getCertificateFieldById);
router.put("/:id", authMiddleware, updateCertificateField);
router.delete("/:id", authMiddleware, deleteCertificateField);

export default router;

