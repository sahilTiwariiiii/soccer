import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import {
  createFloor,
  deleteFloor,
  getFloorById,
  getFloors,
  updateFloor,
} from "../../controllers/branchescontroller/floor.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createFloor);
router.get("/", authMiddleware, getFloors);
router.get("/:id", authMiddleware, getFloorById);
router.put("/:id", authMiddleware, updateFloor);
router.delete("/:id", authMiddleware, deleteFloor);

export default router;

