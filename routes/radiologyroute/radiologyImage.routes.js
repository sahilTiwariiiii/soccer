import express from "express";
import {
  createRadiologyImage,
  getAllRadiologyImages,
  getRadiologyImageById,
  updateRadiologyImage,
  deleteRadiologyImage
} from "../controllers/radiologyImage.controller.js";



const router = express.Router();



router.post("/", createRadiologyImage);

router.get("/", getAllRadiologyImages);

router.get("/:id", getRadiologyImageById);

router.put("/:id", updateRadiologyImage);

router.delete("/:id", deleteRadiologyImage);

export default router;