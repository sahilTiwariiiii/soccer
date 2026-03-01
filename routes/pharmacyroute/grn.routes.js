import express from "express";
import {
  createGRN,
  getGRNs,
  getGRNById,
  updateGRN,
  deleteGRN
} from "../controllers/grn.controller.js";

import { authenticateUser } from "../middleware/authMiddleware.js";

const router = express.Router();
router.use(authenticateUser);

// CRUD routes
router.post("/", createGRN);
router.get("/", getGRNs);
router.get("/:id", getGRNById);
router.put("/:id", updateGRN);
router.delete("/:id", deleteGRN);

export default router;