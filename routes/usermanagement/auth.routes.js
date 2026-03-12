import express from "express";
import { registerUser } from "../../controllers/authContoller.js";
import authMiddleware from "../../middlewares/auth.js";

const router = express.Router();

// Public routes could be login, but usually, it's already in UserRoute.js
// I'll just add register here as requested for the management module.
router.post("/register", authMiddleware, registerUser);

export default router;
