// routes/bloodDiscard.routes.js
import express from "express";
import {
  createBloodDiscard,
  getAllBloodDiscards,
  getBloodDiscardById,
  deleteBloodDiscard,
} from "../controllers/bloodDiscard.controller.js";



const router = express.Router();



// Discard blood
router.post("/", createBloodDiscard);

// Get all discard records
router.get("/", getAllBloodDiscards);

// Get single
router.get("/:id", getBloodDiscardById);

// Delete discard record
router.delete("/:id", deleteBloodDiscard);

export default router;