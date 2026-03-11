import express from "express";
import {
  createMedicine,
  getMedicines,
  getMedicineById,
  updateMedicine,
  toggleMedicineStatus
} from "../../controllers/pharmacycontroller/medicine.controller.js";



const router = express.Router();



// CRUD + toggle
router.post("/", createMedicine);
router.get("/", getMedicines);
router.get("/:id", getMedicineById);
router.put("/:id", updateMedicine);
router.patch("/:id/status", toggleMedicineStatus);

export default router;