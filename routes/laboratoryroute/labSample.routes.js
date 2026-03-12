import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import {
  createLabSample,
  getAllLabSamples,
  getLabSampleById,
  updateLabSampleStatus,
  deleteLabSample
} from "../controllers/labSample.controller.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", createLabSample);

router.get("/", getAllLabSamples);

router.get("/:id", getLabSampleById);

router.put("/:id/status", updateLabSampleStatus);

router.delete("/:id", deleteLabSample);

export default router;