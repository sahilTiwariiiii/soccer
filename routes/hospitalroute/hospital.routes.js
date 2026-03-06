import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import {
  createHospital,
  deleteHospital,
  getHospitalById,
  getHospitals,
  updateHospital,
} from "../../controllers/hospitalcontroller/hospital.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createHospital);
router.get("/", authMiddleware, getHospitals);
router.get("/:id", authMiddleware, getHospitalById);
router.put("/:id", authMiddleware, updateHospital);
router.delete("/:id", authMiddleware, deleteHospital);

export default router;

