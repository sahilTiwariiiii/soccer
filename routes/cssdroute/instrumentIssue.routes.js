import express from "express";
import {
  issueInstrument,
  returnInstrument,
  getIssuedInstruments,
  getSingleIssuedInstrument,
  updateIssuedInstrument,
  deleteIssuedInstrument,
} from "../controllers/instrumentIssue.controller.js";
import authMiddleware from "../middlewares/auth.js";

const router = express.Router();

// Issue instrument
router.post("/", authMiddleware, issueInstrument);

// Return instrument
router.put("/return/:id", authMiddleware, returnInstrument);

// Get all issued instruments with optional filters
router.get("/", authMiddleware, getIssuedInstruments);

// Get single issued record
router.get("/:id", authMiddleware, getSingleIssuedInstrument);

// Update (rare)
router.put("/:id", authMiddleware, updateIssuedInstrument);

// Delete (rare)
router.delete("/:id", authMiddleware, deleteIssuedInstrument);

export default router;