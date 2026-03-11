import express from "express";
import {
  createSupplier,
  getSuppliers,
  getSupplierById,
  updateSupplier,
  toggleSupplierStatus,
  deleteSupplier
} from "../../controllers/pharmacycontroller/supplier.controller.js";

const router = express.Router();

router.post("/", createSupplier);
router.get("/", getSuppliers);
router.get("/:id", getSupplierById);
router.put("/:id", updateSupplier);
router.patch("/:id/toggle-status", toggleSupplierStatus);
router.delete("/:id", deleteSupplier);

export default router;