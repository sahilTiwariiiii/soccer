import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import {
  createGlobalVital,
  deleteGlobalVital,
  getGlobalVitalById,
  getGlobalVitals,
  updateGlobalVital,
} from "../../controllers/vitalscontroller/globalVitals.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createGlobalVital);
router.get("/", authMiddleware, getGlobalVitals);
router.get("/:id", authMiddleware, getGlobalVitalById);
router.put("/:id", authMiddleware, updateGlobalVital);
router.delete("/:id", authMiddleware, deleteGlobalVital);

export default router;

