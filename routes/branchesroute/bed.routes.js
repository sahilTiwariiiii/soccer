import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import {
  createBed,
  deleteBed,
  getBedById,
  getBeds,
  updateBed,
} from "../../controllers/branchescontroller/bed.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createBed);
router.get("/", authMiddleware, getBeds);
router.get("/:id", authMiddleware, getBedById);
router.put("/:id", authMiddleware, updateBed);
router.delete("/:id", authMiddleware, deleteBed);

export default router;

