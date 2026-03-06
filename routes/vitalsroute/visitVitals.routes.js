import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import {
  createVisitVitals,
  deleteVisitVitals,
  getVisitVitalsById,
  getVisitVitalsList,
  updateVisitVitals,
} from "../../controllers/vitalscontroller/visitVitals.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createVisitVitals);
router.get("/", authMiddleware, getVisitVitalsList);
router.get("/:id", authMiddleware, getVisitVitalsById);
router.put("/:id", authMiddleware, updateVisitVitals);
router.delete("/:id", authMiddleware, deleteVisitVitals);

export default router;

