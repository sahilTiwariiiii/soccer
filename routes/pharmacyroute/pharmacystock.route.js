import express from "express";
import {
  createPharmacyStock,
  getPharmacyStocks,
  getPharmacyStockById,
  updatePharmacyStock,
  deletePharmacyStock
} from "../../controllers/pharmacycontroller/pharmacystock.controller.js";

import authMiddleware from "../../middlewares/auth.js";

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// CRUD routes
router.post("/", createPharmacyStock);
router.get("/", getPharmacyStocks);
router.get("/:id", getPharmacyStockById);
router.put("/:id", updatePharmacyStock);
router.delete("/:id", deletePharmacyStock);

export default router;