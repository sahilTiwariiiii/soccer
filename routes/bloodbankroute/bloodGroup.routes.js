// routes/bloodGroup.routes.js
import express from "express";
import {
  createBloodGroup,
  getAllBloodGroups,
  getBloodGroupById,
  updateBloodGroup,
  deleteBloodGroup,
} from "../controllers/bloodGroup.controller.js";

import authMiddleware from "../middlewares/auth.js";

const router = express.Router();

// All routes protected
router.use(authMiddleware);

// Create
router.post("/", createBloodGroup);

// Get All
router.get("/", getAllBloodGroups);

// Get By ID
router.get("/:id", getBloodGroupById);

// Update
router.put("/:id", updateBloodGroup);

// Delete
router.delete("/:id", deleteBloodGroup);

export default router;