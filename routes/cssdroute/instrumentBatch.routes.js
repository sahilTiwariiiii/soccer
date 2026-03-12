import express from "express";
import {
  createInstrumentBatch,
  getInstrumentBatches,
  getSingleInstrumentBatch,
  updateInstrumentBatch,
  deleteInstrumentBatch,
} from "../../controllers/cssdcontroller/instrumentBatch.controller.js";
import authMiddleware from "../../middlewares/auth.js";

const router = express.Router();

// Create batch
router.post("/", authMiddleware, createInstrumentBatch);

// Get all batches with filters
router.get("/", authMiddleware, getInstrumentBatches);

// Get single batch
router.get("/:id", authMiddleware, getSingleInstrumentBatch);

// Update batch
router.put("/:id", authMiddleware, updateInstrumentBatch);

// Delete batch
router.delete("/:id", authMiddleware, deleteInstrumentBatch);

export default router;