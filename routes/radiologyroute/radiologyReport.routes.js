import express from "express";
import {
  createRadiologyReport,
  getAllRadiologyReports,
  getRadiologyReportById,
  updateRadiologyReport,
  verifyRadiologyReport,
  deleteRadiologyReport
} from "../controllers/radiologyReport.controller.js";


const router = express.Router();


router.post("/", createRadiologyReport);

router.get("/", getAllRadiologyReports);

router.get("/:id", getRadiologyReportById);

router.put("/:id", updateRadiologyReport);

router.put("/:id/verify", verifyRadiologyReport);

router.delete("/:id", deleteRadiologyReport);

export default router;