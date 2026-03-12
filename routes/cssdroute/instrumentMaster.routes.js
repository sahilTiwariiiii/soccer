import express from "express";
import {
  createInstrument,
  getInstruments,
  getSingleInstrument,
  updateInstrument,
  deleteInstrument,
} from "../../controllers/cssdcontroller/instrumentMaster.controller.js";
import authMiddleware from "../../middlewares/auth.js";

const router = express.Router();

// Create
router.post("/", authMiddleware, createInstrument);

// Get all with optional filters
router.get("/", authMiddleware, getInstruments);

// Get single
router.get("/:id", authMiddleware, getSingleInstrument);

// Update
router.put("/:id", authMiddleware, updateInstrument);

// Delete
router.delete("/:id", authMiddleware, deleteInstrument);

export default router;