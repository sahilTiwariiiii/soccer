import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import {
  createState,
  deleteState,
  getStateById,
  getStates,
  updateState,
} from "../../controllers/geocontroller/state.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createState);
router.get("/", authMiddleware, getStates);
router.get("/:id", authMiddleware, getStateById);
router.put("/:id", authMiddleware, updateState);
router.delete("/:id", authMiddleware, deleteState);

export default router;

