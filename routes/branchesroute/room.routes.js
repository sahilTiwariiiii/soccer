import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import {
  createRoom,
  deleteRoom,
  getRoomById,
  getRooms,
  updateRoom,
} from "../../controllers/branchescontroller/room.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createRoom);
router.get("/", authMiddleware, getRooms);
router.get("/:id", authMiddleware, getRoomById);
router.put("/:id", authMiddleware, updateRoom);
router.delete("/:id", authMiddleware, deleteRoom);

export default router;

