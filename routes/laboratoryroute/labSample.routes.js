import express from "express";
import {
  createLabSample,
  getAllLabSamples,
  getLabSampleById,
  updateLabSampleStatus,
  deleteLabSample
} from "../controllers/labSample.controller.js";



const router = express.Router();



router.post("/", createLabSample);

router.get("/", getAllLabSamples);

router.get("/:id", getLabSampleById);

router.put("/:id/status", updateLabSampleStatus);

router.delete("/:id", deleteLabSample);

export default router;