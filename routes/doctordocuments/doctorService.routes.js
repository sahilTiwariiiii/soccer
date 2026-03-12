import express from "express";
import {
  createDoctorService,
  getAllDoctorServices,
  getDoctorServiceById,
  updateDoctorService,
  deleteDoctorService,
  addServiceToDoctor,
  removeServiceFromDoctor
} from "../../controllers/doctorcotroller/doctorService.controller.js";

const router = express.Router();

// Create mapping
router.post("/", createDoctorService);

// Get all (with filters + pagination)
router.get("/", getAllDoctorServices);

// Get by ID
router.get("/:id", getDoctorServiceById);

// Add service to doctor
router.post("/:id/service", addServiceToDoctor);

// Remove service
router.delete("/:id/service/:serviceId", removeServiceFromDoctor);

// Update full
router.put("/:id", updateDoctorService);

// Delete
router.delete("/:id", deleteDoctorService);

export default router;