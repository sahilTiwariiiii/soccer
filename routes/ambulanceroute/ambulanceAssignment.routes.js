import express from "express";
import {
  createAssignment,
  updateAssignment,
  getAssignments,
  getSingleAssignment,
  deleteAssignment
} from "../../controllers/ambulancecontroller/ambulanceAssignment.controller.js";
import authMiddleware from "../../middlewares/auth.js";


const router = express.Router();

// Create assignment
router.post("/", authMiddleware, createAssignment);

// Update assignment
router.put("/:id", authMiddleware, updateAssignment);

// Get all assignments with optional filters
router.get("/", authMiddleware, getAssignments);

// Get single assignment
router.get("/:id", authMiddleware, getSingleAssignment);

// Delete assignment
router.delete("/:id", authMiddleware, deleteAssignment);

export default router;