import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import {
  createRadiologyImage,
  getAllRadiologyImages,
  getRadiologyImageById,
  updateRadiologyImage,
  deleteRadiologyImage
} from "../../controllers/radiologycontroller/radiologyImage.controller.js";



const router = express.Router();

router.use(authMiddleware);

router.post("/", createRadiologyImage);

router.get("/", getAllRadiologyImages);

router.get("/:id", getRadiologyImageById);

router.put("/:id", updateRadiologyImage);

router.delete("/:id", deleteRadiologyImage);

export default router;