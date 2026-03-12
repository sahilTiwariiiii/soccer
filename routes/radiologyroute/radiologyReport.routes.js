import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import {
  createRadiologyReport,
  getAllRadiologyReports,
  getRadiologyReportById,
  updateRadiologyReport,
  verifyRadiologyReport,
  deleteRadiologyReport
} from "../../controllers/radiologycontroller/radiologyReport.controller.js";


const router = express.Router();

router.use(authMiddleware);

router.post("/", createRadiologyReport);

router.get("/", getAllRadiologyReports);

router.get("/:id", getRadiologyReportById);

router.put("/:id", updateRadiologyReport);

router.put("/:id/verify", verifyRadiologyReport);

router.delete("/:id", deleteRadiologyReport);

export default router;