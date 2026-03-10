import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import { getVisitSummary, createOrUpdateVisitSummary } from "../../controllers/opdcontroller/opd.controller.js";

const router = express.Router();

router.get("/:visitId/summary", authMiddleware, getVisitSummary);
router.post("/summary", authMiddleware, createOrUpdateVisitSummary);

export default router;
