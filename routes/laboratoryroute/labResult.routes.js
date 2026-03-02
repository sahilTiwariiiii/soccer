import express from "express";
import {
  createLabResult,
  getAllLabResults,
  getLabResultById,
  updateLabResult,
  updateLabResultStatus,
  deleteLabResult
} from "../controllers/labResult.controller.js";



const router = express.Router();



router.post("/", createLabResult);

router.get("/", getAllLabResults);

router.get("/:id", getLabResultById);

router.put("/:id", updateLabResult);

router.put("/:id/status", updateLabResultStatus);

router.delete("/:id", deleteLabResult);

export default router;