// routes/bloodIssue.routes.js
import express from "express";
import {
  createBloodIssue,
  getAllBloodIssues,
  getBloodIssueById,
  returnBloodIssue,
  deleteBloodIssue,
} from "../../controllers/bloodbankcontroller/bloodIssue.controller.js";



const router = express.Router();



// Issue Blood
router.post("/", createBloodIssue);

// Get All
router.get("/", getAllBloodIssues);

// Get Single
router.get("/:id", getBloodIssueById);

// Return Blood
router.patch("/:id/return", returnBloodIssue);

// Delete
router.delete("/:id", deleteBloodIssue);

export default router;