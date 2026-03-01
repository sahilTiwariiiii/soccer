import express from "express";
import {
  createPharmacyStock,
  getPharmacyStocks,
  getPharmacyStockById,
  updatePharmacyStock,
  deletePharmacyStock
} from "../controllers/pharmacystock.controller.js";

import { authenticateUser } from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes require authentication
router.use(authenticateUser);

// CRUD routes
router.post("/", createPharmacyStock);
router.get("/", getPharmacyStocks);
router.get("/:id", getPharmacyStockById);
router.put("/:id", updatePharmacyStock);
router.delete("/:id", deletePharmacyStock);

export default router;