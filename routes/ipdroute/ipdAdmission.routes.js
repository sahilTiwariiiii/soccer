import express from "express";
import {
  createIPDAdmission,
  getIPDAdmissions,
  getSingleIPDAdmission,
  updateIPDAdmission,
  dischargeIPDPatient,
  deleteIPDAdmission,
} from "../controllers/ipdAdmission.controller.js";

import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createIPDAdmission);

router.get("/", authMiddleware, getIPDAdmissions);

router.get("/:id", authMiddleware, getSingleIPDAdmission);

router.put("/:id", authMiddleware, updateIPDAdmission);

router.put("/:id/discharge", authMiddleware, dischargeIPDPatient);

router.delete("/:id", authMiddleware, deleteIPDAdmission);

export default router;