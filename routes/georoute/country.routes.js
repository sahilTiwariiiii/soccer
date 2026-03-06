import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import {
  createCountry,
  deleteCountry,
  getCountries,
  getCountryById,
  updateCountry,
} from "../../controllers/geocontroller/country.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createCountry);
router.get("/", authMiddleware, getCountries);
router.get("/:id", authMiddleware, getCountryById);
router.put("/:id", authMiddleware, updateCountry);
router.delete("/:id", authMiddleware, deleteCountry);

export default router;

