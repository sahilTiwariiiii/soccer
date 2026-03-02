// routes/crossMatch.routes.js
import express from "express";
import {
  createCrossMatch,
  getAllCrossMatches,
  getCrossMatchById,
  updateCrossMatch,
  deleteCrossMatch,
} from "../controllers/crossMatch.controller.js";



const router = express.Router();



// Create
router.post("/", createCrossMatch);

// Get All (with filters)
router.get("/", getAllCrossMatches);

// Get Single
router.get("/:id", getCrossMatchById);

// Update
router.put("/:id", updateCrossMatch);

// Delete
router.delete("/:id", deleteCrossMatch);

export default router;