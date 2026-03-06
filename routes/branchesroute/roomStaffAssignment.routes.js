import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import {
  createRoomStaffAssignment,
  deleteRoomStaffAssignment,
  getRoomStaffAssignmentById,
  getRoomStaffAssignments,
  updateRoomStaffAssignment,
} from "../../controllers/branchescontroller/roomStaffAssignment.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createRoomStaffAssignment);
router.get("/", authMiddleware, getRoomStaffAssignments);
router.get("/:id", authMiddleware, getRoomStaffAssignmentById);
router.put("/:id", authMiddleware, updateRoomStaffAssignment);
router.delete("/:id", authMiddleware, deleteRoomStaffAssignment);

export default router;

