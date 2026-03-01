import express from "express";
import {
  createPharmacyInvoice,
  getPharmacyInvoices,
  getPharmacyInvoiceById,
  updatePharmacyInvoice,
  updateInvoiceHtml,
  deletePharmacyInvoice
} from "../controllers/pharmacyInvoice.controller.js";



const router = express.Router();



// CRUD + extra functionality
router.post("/", createPharmacyInvoice);
router.get("/", getPharmacyInvoices);
router.get("/:id", getPharmacyInvoiceById);
router.put("/:id", updatePharmacyInvoice);           // Update all fields
router.put("/html/:id", updateInvoiceHtml);         // Update only invoiceHtml
router.delete("/:id", deletePharmacyInvoice);

export default router;