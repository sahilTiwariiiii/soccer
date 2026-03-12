import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import {
  createRadiologyStudy,
  getAllRadiologyStudies,
  getRadiologyStudyById,
  updateRadiologyStudy,
  updateRadiologyStudyStatus,
  deleteRadiologyStudy
} from "../controllers/radiologyStudy.controller.js";



const router = express.Router();

router.use(authMiddleware);

router.post("/", createRadiologyStudy);

router.get("/", getAllRadiologyStudies);

router.get("/:id", getRadiologyStudyById);

router.put("/:id", updateRadiologyStudy);

router.put("/:id/status", updateRadiologyStudyStatus);

router.delete("/:id", deleteRadiologyStudy);

export default router;