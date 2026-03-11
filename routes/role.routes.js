import express from "express";
import {
  createRole,
  getRoles,
  getRoleById,
  updateRole,
  deleteRole,
} from "../controllers/role.controller.js";
import authMiddleware from "../middlewares/auth.js";

const router = express.Router();

router.post("/", authMiddleware, createRole);
router.get("/", authMiddleware, getRoles);
router.get("/:id", authMiddleware, getRoleById);
router.put("/:id", authMiddleware, updateRole);
router.delete("/:id", authMiddleware, deleteRole);

export default router;
