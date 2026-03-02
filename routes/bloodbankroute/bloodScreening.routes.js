// routes/bloodScreening.routes.js
import express from "express";
import {
  createBloodScreening,
  getAllBloodScreenings,
  getBloodScreeningById,
  updateBloodScreening,
  deleteBloodScreening,
} from "../controllers/bloodScreening.controller.js";



const router = express.Router();



router.post("/", createBloodScreening);
router.get("/", getAllBloodScreenings);
router.get("/:id", getBloodScreeningById);
router.put("/:id", updateBloodScreening);
router.delete("/:id", deleteBloodScreening);

export default router;