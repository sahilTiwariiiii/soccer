import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import { getVisitSummary } from "../../controllers/opdcontroller/opd.controller.js";

const router = express.Router();

router.get("/:visitId/summary", authMiddleware, getVisitSummary);

export default router;
