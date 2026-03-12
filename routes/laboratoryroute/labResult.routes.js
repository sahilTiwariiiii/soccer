import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import {
  createLabResult,
  getAllLabResults,
  getLabResultById,
  updateLabResult,
  updateLabResultStatus,
  deleteLabResult
} from "../../controllers/laboratorycontroller/labResult.controller.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", createLabResult);

router.get("/", getAllLabResults);

router.get("/:id", getLabResultById);

router.put("/:id", updateLabResult);

router.put("/:id/status", updateLabResultStatus);

router.delete("/:id", deleteLabResult);

export default router;