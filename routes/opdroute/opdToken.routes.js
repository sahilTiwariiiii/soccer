import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import { issueToken, listTokens, callToken, completeToken } from "../../controllers/opdcontroller/opdToken.controller.js";

const router = express.Router();

router.post("/", authMiddleware, issueToken);
router.get("/", authMiddleware, listTokens);
router.patch("/:id/call", authMiddleware, callToken);
router.patch("/:id/complete", authMiddleware, completeToken);

export default router;
