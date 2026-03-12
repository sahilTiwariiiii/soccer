import express from "express";
import {
  createDoctorDocument,
  getAllDoctorDocuments,
  getByDoctor,
  getById,
  addDocument,
  updateDigitalSignature,
  deleteSingleDocument,
  deleteDoctorDocument
} from "../../controllers/doctorcotroller/doctorDocument.js";

const router = express.Router();

router.post("/", createDoctorDocument);

router.get("/", getAllDoctorDocuments);
router.get("/doctor/:doctorId", getByDoctor);
router.get("/:id", getById);

router.patch("/:id/add-document", addDocument);
router.patch("/:id/signature", updateDigitalSignature);

router.delete("/:id/document/:documentId", deleteSingleDocument);
router.delete("/:id", deleteDoctorDocument);

export default router;