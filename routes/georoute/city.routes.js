import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import {
  createCity,
  deleteCity,
  getCities,
  getCityById,
  updateCity,
} from "../../controllers/geocontroller/city.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createCity);
router.get("/", authMiddleware, getCities);
router.get("/:id", authMiddleware, getCityById);
router.put("/:id", authMiddleware, updateCity);
router.delete("/:id", authMiddleware, deleteCity);

export default router;

