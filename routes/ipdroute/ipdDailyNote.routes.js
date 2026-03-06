import express from "express";
import {
  createIPDDailyNote,
  getIPDDailyNotes,
  getSingleIPDDailyNote,
  updateIPDDailyNote,
  deleteIPDDailyNote,
} from "../../controllers/ipdcontroller/ipdDailyNote.controller.js";

import authMiddleware from "../../middlewares/auth.js";

const router = express.Router();

router.post("/", authMiddleware, createIPDDailyNote);

router.get("/", authMiddleware, getIPDDailyNotes);

router.get("/:id", authMiddleware, getSingleIPDDailyNote);

router.put("/:id", authMiddleware, updateIPDDailyNote);

router.delete("/:id", authMiddleware, deleteIPDDailyNote);

export default router;