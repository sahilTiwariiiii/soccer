import express from "express";
import { ipdQuickAdmissionController } from "../../controllers/ipdcontroller/ipdQuickAdmission.controller.js";
import authMiddleware from "../../middlewares/auth.js";

const router = express.Router();

/**
 * @route POST /api/v1/ipd/quick-admission
 * @desc Quick Patient Registration + IPD Visit + Bed Admission
 * @access Private
 */
router.post("/quick-admission", authMiddleware, ipdQuickAdmissionController);

export default router;
