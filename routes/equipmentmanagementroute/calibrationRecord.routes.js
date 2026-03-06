import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import {
  createCalibrationRecord,
  deleteCalibrationRecord,
  getCalibrationRecordById,
  getCalibrationRecords,
  updateCalibrationRecord,
} from "../../controllers/equipmentmanagementcontroller/calibrationRecord.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createCalibrationRecord);
router.get("/", authMiddleware, getCalibrationRecords);
router.get("/:id", authMiddleware, getCalibrationRecordById);
router.put("/:id", authMiddleware, updateCalibrationRecord);
router.delete("/:id", authMiddleware, deleteCalibrationRecord);

export default router;

