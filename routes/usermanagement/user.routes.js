import express from "express";
import { getUserById, getAllUsers, updateUser, deleteUser } from "../../controllers/user.controller.js";
import authMiddleware from "../../middlewares/auth.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
