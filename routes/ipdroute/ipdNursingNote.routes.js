import express from "express";
import {
  createIPDNursingNote,
  getIPDNursingNotes,
  getSingleIPDNursingNote,
  updateIPDNursingNote,
  deleteIPDNursingNote,
} from "../controllers/ipdNursingNote.controller.js";

import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createIPDNursingNote);

router.get("/", authMiddleware, getIPDNursingNotes);

router.get("/:id", authMiddleware, getSingleIPDNursingNote);

router.put("/:id", authMiddleware, updateIPDNursingNote);

router.delete("/:id", authMiddleware, deleteIPDNursingNote);

export default router;