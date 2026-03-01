import express from "express";
import {
  createDoctorFinancial,
  getAllDoctorFinancials,
  getDoctorFinancialById,
  updateDoctorFinancial,
  deleteDoctorFinancial
} from "../controllers/doctorFinancial.controller.js";

const router = express.Router();

// Create
router.post("/", createDoctorFinancial);

// Get All (with filters & pagination)
router.get("/", getAllDoctorFinancials);

// Get By ID
router.get("/:id", getDoctorFinancialById);

// Update
router.put("/:id", updateDoctorFinancial);

// Delete
router.delete("/:id", deleteDoctorFinancial);

export default router;